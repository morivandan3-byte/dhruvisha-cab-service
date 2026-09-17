import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import {
  ArrowLeft,
  CarFront,
  Download,
  MapPin,
  Phone,
  Receipt,
  Share2,
  UserRound,
} from "lucide-react";

const VEHICLE_NUMBER = "GJ05CY7195";

const vehicles = [
  {
    name: "Swift Dzire",
    driver: "Bhavesh Jadav",
    driverMobile: "+91 97124 97925",
  },
  {
    name: "Xcent",
    driver: "Darshan Jadav",
    driverMobile: "+91 8140675891",
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-yellow-400 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/30 dark:focus:border-yellow-400/50";

const createPDF = (bill) => {
  const doc = new jsPDF();
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const left = 15;
  const right = w - 15;
  const contentW = right - left;

  const blue = [30, 82, 170];
  const darkBlue = [20, 55, 120];
  const black = [35, 35, 35];
  const gray = [105, 105, 105];
  const lightGray = [225, 230, 238];
  const lightBlue = [244, 247, 252];

  const toText = (value) => {
    if (Array.isArray(value)) {
      return value.join(" ");
    }

    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  };

  const wrap = (value, width) =>
    doc.splitTextToSize(toText(value), width);

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, w, h, "F");

  doc.setDrawColor(...blue);
  doc.setLineWidth(1.2);
  doc.roundedRect(8, 8, w - 16, h - 16, 3, 3);

  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.4);
  doc.roundedRect(11, 11, w - 22, h - 22, 2, 2);

  doc.setFillColor(...blue);
  doc.roundedRect(left, 15, contentW, 30, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("DHRUVISHA CAB SERVICE", left + 8, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(
    "Available 24/7  |  All Over India Services",
    left + 8,
    36
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("INVOICE", right - 8, 23, {
    align: "right",
  });

  doc.setFontSize(13);
  doc.text(
    toText(bill.billNumber),
    right - 8,
    31,
    { align: "right" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    new Date(bill.billDate).toLocaleDateString("en-IN"),
    right - 8,
    39,
    { align: "right" }
  );

  const infoY = 55;
  const gap = 6;
  const cardW = (contentW - gap) / 2;
  const valueW = cardW - 47;

  const customerName = wrap(bill.customerName, valueW);
  const driverName = wrap(bill.driver, valueW);
  const driverMobile = wrap(bill.driverMobile, valueW);
  const vehicleNo = wrap(bill.vehicleNumber, valueW);

  const customerH = 35 + customerName.length * 5;

  const driverH =
    52 +
    Math.max(
      driverName.length,
      driverMobile.length,
      vehicleNo.length
    ) *
      2;

  const cardH = Math.max(45, customerH, driverH);

  const drawCard = (x, title, lines) => {
    doc.setFillColor(...lightBlue);
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.7);

    doc.roundedRect(
      x,
      infoY,
      cardW,
      cardH,
      3,
      3,
      "FD"
    );

    doc.setTextColor(...blue);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(
      toText(title),
      x + 6,
      infoY + 9
    );

    doc.setDrawColor(...blue);
    doc.line(
      x + 6,
      infoY + 12,
      x + 43,
      infoY + 12
    );

    let y = infoY + 22;

    lines.forEach(([label, value]) => {
      const textValue = toText(value);

      doc.setTextColor(...gray);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(
        toText(label),
        x + 6,
        y
      );

      doc.setTextColor(...black);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);

      doc.text(
        textValue,
        x + 35,
        y
      );

      y += 10;
    });
  };

  drawCard(left, "CUSTOMER DETAILS", [
    ["Name", toText(customerName)],
    ["Mobile", toText(bill.mobile)],
  ]);

  drawCard(
    left + cardW + gap,
    "DRIVER DETAILS",
    [
      ["Driver", toText(driverName)],
      ["Mobile", toText(driverMobile)],
      ["Vehicle No.", toText(vehicleNo)],
    ]
  );

  const tripTitleY = infoY + cardH + 25;

  doc.setTextColor(...darkBlue);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(
    "TRIP DETAILS",
    left,
    tripTitleY
  );

  doc.setDrawColor(...blue);
  doc.setLineWidth(0.8);
  doc.line(
    left,
    tripTitleY + 3,
    left + 30,
    tripTitleY + 3
  );

  const tableY = tripTitleY + 12;
  const pickupW = 58;
  const dropW = 58;
  const vehicleW =
    contentW - pickupW - dropW;

  const pickup = wrap(
    bill.pickup,
    pickupW - 10
  );

  const drop = wrap(
    bill.drop,
    dropW - 10
  );

  const vehicle = wrap(
    bill.vehicle,
    vehicleW - 10
  );

  const headerH = 13;

  const bodyH =
    Math.max(
      pickup.length,
      drop.length,
      vehicle.length,
      1
    ) *
      5.5 +
    10;

  doc.setFillColor(...blue);
  doc.roundedRect(
    left,
    tableY,
    contentW,
    headerH,
    2,
    2,
    "F"
  );

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);

  doc.text(
    "PICKUP LOCATION",
    left + 5,
    tableY + 8
  );

  doc.text(
    "DROP LOCATION",
    left + pickupW + 5,
    tableY + 8
  );

  doc.text(
    "VEHICLE",
    left + pickupW + dropW + 5,
    tableY + 8
  );

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.5);

  doc.rect(
    left,
    tableY + headerH,
    contentW,
    bodyH
  );

  doc.line(
    left + pickupW,
    tableY + headerH,
    left + pickupW,
    tableY + headerH + bodyH
  );

  doc.line(
    left + pickupW + dropW,
    tableY + headerH,
    left + pickupW + dropW,
    tableY + headerH + bodyH
  );

  const textY =
    tableY + headerH + 9;

  doc.setTextColor(...black);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);

  doc.text(
    pickup,
    left + 5,
    textY,
    {
      lineHeightFactor: 1.35,
    }
  );

  doc.text(
    drop,
    left + pickupW + 5,
    textY,
    {
      lineHeightFactor: 1.35,
    }
  );

  doc.setFont("helvetica", "bold");

  doc.text(
    vehicle,
    left + pickupW + dropW + 5,
    textY,
    {
      lineHeightFactor: 1.35,
    }
  );

  const totalY =
    tableY +
    headerH +
    bodyH +
    15;

  doc.setFillColor(...lightBlue);
  doc.setDrawColor(...blue);
  doc.setLineWidth(0.8);

  doc.roundedRect(
    left,
    totalY,
    contentW,
    35,
    3,
    3,
    "FD"
  );

  doc.setTextColor(...gray);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);

  doc.text(
    "TOTAL AMOUNT",
    left + 8,
    totalY + 13
  );

  doc.setTextColor(...black);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(
    "Amount payable",
    left + 8,
    totalY + 23
  );

  doc.setTextColor(...blue);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);

  doc.text(
    `Rs. ${toText(bill.totalAmount)}`,
    right - 8,
    totalY + 21,
    {
      align: "right",
    }
  );

  const thankY = totalY + 55;

  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);

  doc.text(
    "Thank you for choosing Dhruvisha Cab Service.",
    w / 2,
    thankY,
    {
      align: "center",
    }
  );

  doc.setFontSize(7.5);

  doc.text(
    "Safe Journey  |  Professional Service  |  Available 24/7",
    w / 2,
    thankY + 7,
    {
      align: "center",
    }
  );

  const signatureY = thankY + 25;

  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.5);

  doc.line(
    right - 70,
    signatureY + 12,
    right,
    signatureY + 12
  );

  doc.setTextColor(...darkBlue);
  doc.setFont("times", "italic");
  doc.setFontSize(17);

  doc.text(
    "BHAVESH JADAV",
    right,
    signatureY + 7,
    {
      align: "right",
    }
  );

  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);

  doc.text(
    "Car Owner Signature",
    right,
    signatureY + 18,
    {
      align: "right",
    }
  );

  const footerY = h - 27;

  doc.setDrawColor(...lightGray);

  doc.line(
    left,
    footerY - 8,
    right,
    footerY - 8
  );

  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);

  doc.text(
    "This is a computer-generated bill and does not require a physical stamp.",
    w / 2,
    footerY,
    {
      align: "center",
    }
  );

  doc.setTextColor(...blue);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);

  doc.text(
    "DHRUVISHA CAB SERVICE",
    w / 2,
    footerY + 7,
    {
      align: "center",
    }
  );

  return doc;
};

const Bill = () => {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [billData, setBillData] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    pickup: "",
    drop: "",
    vehicle: "",
    totalAmount: "",
  });

  const selectedVehicle = useMemo(
    () =>
      vehicles.find(
        (v) => v.name === formData.vehicle
      ),
    [formData.vehicle]
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleGenerateBill = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/bills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Bill create failed"
        );
      }

      setBillData(data.bill);
      setGenerated(true);
    } catch (error) {
      console.error(
        "Generate bill error:",
        error
      );

      setError(
        error.message ||
          "Bill generate karva ma problem avi."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSavePDF = () => {
    if (!billData) return;

    try {
      setPdfLoading(true);

      const doc = createPDF(billData);

      doc.save(
        `${billData.billNumber}.pdf`
      );
    } catch (error) {
      console.error(
        "PDF error:",
        error
      );

      alert(
        "PDF generate karva ma problem avi."
      );
    } finally {
      setPdfLoading(false);
    }
  };

  const handleShareWhatsApp = async () => {
    if (!billData) return;

    try {
      setPdfLoading(true);

      const doc = createPDF(billData);
      const blob = doc.output("blob");

      const file = new File(
        [blob],
        `${billData.billNumber}.pdf`,
        {
          type: "application/pdf",
        }
      );

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })
      ) {
        await navigator.share({
          title: `Dhruvisha Cab - ${billData.billNumber}`,
          text: `Dhruvisha Cab Service Bill ${billData.billNumber}`,
          files: [file],
        });

        return;
      }

      doc.save(
        `${billData.billNumber}.pdf`
      );

      const message = `DHRUVISHA CAB SERVICE

Bill Number: ${billData.billNumber}
Bill Date: ${new Date(
        billData.billDate
      ).toLocaleDateString("en-IN")}

Customer: ${billData.customerName}
Mobile: ${billData.mobile}

Pickup: ${billData.pickup}
Drop: ${billData.drop}

Vehicle: ${billData.vehicle}
Driver: ${billData.driver}
Driver Mobile: ${billData.driverMobile}
Vehicle Number: ${billData.vehicleNumber}

Total Amount: Rs. ${billData.totalAmount}

PDF downloaded. Please attach the PDF here.`;

      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          message
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(
          "Share error:",
          error
        );

        alert(
          "PDF share karva ma problem avi."
        );
      }
    } finally {
      setPdfLoading(false);
    }
  };

  const handleNewBill = () => {
    setGenerated(false);
    setBillData(null);
    setError("");

    setFormData({
      customerName: "",
      mobile: "",
      pickup: "",
      drop: "",
      vehicle: "",
      totalAmount: "",
    });
  };

  if (generated && billData) {
    return (
      <section
        id="bill"
        className="min-h-screen bg-gray-50 px-5 py-20 text-gray-900 transition-colors dark:bg-[#050505] dark:text-white md:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={handleNewBill}
            className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-yellow-500 dark:text-white/60 dark:hover:text-yellow-400"
          >
            <ArrowLeft size={18} />
            Create New Bill
          </button>

          <div
            id="bill-content"
            className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-colors dark:border-white/10 dark:bg-[#101010] md:p-10"
          >
            <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-6 dark:border-white/10 sm:flex-row">
              <div>
                <h1 className="text-2xl font-bold tracking-wide text-yellow-500 dark:text-yellow-400">
                  DHRUVISHA CAB
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
                  Cab Service, Surat, Gujarat
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-white/40">
                  Bill Number
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {billData.billNumber}
                </p>

                <p className="mt-2 text-xs uppercase tracking-wider text-gray-400 dark:text-white/40">
                  Bill Date
                </p>

                <p className="mt-1 text-sm">
                  {new Date(
                    billData.billDate
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </p>
              </div>
            </div>

            <div className="grid gap-6 border-b border-gray-200 py-6 dark:border-white/10 md:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2 text-yellow-500 dark:text-yellow-400">
                  <UserRound size={18} />

                  <span className="text-sm font-semibold">
                    Customer Details
                  </span>
                </div>

                <p className="font-medium">
                  {billData.customerName}
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                  <Phone size={10} />
                  {billData.mobile}
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-yellow-500 dark:text-yellow-400">
                  <CarFront size={18} />

                  <span className="text-sm font-semibold">
                    Driver Details
                  </span>
                </div>

                <p className="font-medium">
                  {billData.driver}
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                  <Phone size={10} />
                  {billData.driverMobile}
                </p>

                <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
                  Vehicle No:{" "}
                  <span className="text-gray-900 dark:text-white">
                    {billData.vehicleNumber}
                  </span>
                </p>
              </div>
            </div>

            <div className="border-b border-gray-200 py-6 dark:border-white/10">
              <div className="mb-5 flex items-center gap-2 text-yellow-500 dark:text-yellow-400">
                <MapPin size={18} />

                <span className="text-sm font-semibold">
                  Trip Details
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  ["Pickup", billData.pickup],
                  ["Drop", billData.drop],
                  ["Vehicle", billData.vehicle],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400 dark:text-white/40">
                      {label}
                    </p>

                    <p className="mt-1 font-medium">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-2">
                <Receipt
                  size={20}
                  className="text-yellow-500 dark:text-yellow-400"
                />

                <span className="font-semibold">
                  Total Amount
                </span>
              </div>

              <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                ₹{billData.totalAmount}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleSavePDF}
              disabled={pdfLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-60"
            >
              <Download size={18} />

              {pdfLoading
                ? "Processing..."
                : "Save PDF"}
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              disabled={pdfLoading}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:border-yellow-400 hover:text-yellow-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:border-yellow-400/40 dark:hover:text-yellow-400 disabled:opacity-60"
            >
              <Share2 size={18} />

              {pdfLoading
                ? "Processing..."
                : "Share PDF"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="bill"
      className="bg-gray-50 px-5 py-20 text-gray-900 transition-colors dark:bg-[#050505] dark:text-white md:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-500 dark:text-yellow-400">
            Generate Bill
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Create Customer Bill
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-white/50">
            Enter trip and customer details to generate a professional cab
            service bill.
          </p>
        </div>

        <form
          onSubmit={handleGenerateBill}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-[#101010] md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {[
              [
                "customerName",
                "Customer Name",
                "Enter customer name",
                "text",
              ],
              [
                "mobile",
                "Mobile Number",
                "Enter 10 digit mobile number",
                "tel",
              ],
              [
                "pickup",
                "Pickup Location",
                "Enter pickup location",
                "text",
              ],
              [
                "drop",
                "Drop Location",
                "Enter drop location",
                "text",
              ],
            ].map(
              ([name, label, placeholder, type]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm text-gray-700 dark:text-white/70">
                    {label}
                  </label>

                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={
                      name === "mobile"
                        ? (e) => {
                            const value =
                              e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);

                            setFormData(
                              (prev) => ({
                                ...prev,
                                mobile: value,
                              })
                            );

                            setError("");
                          }
                        : handleChange
                    }
                    placeholder={placeholder}
                    inputMode={
                      name === "mobile"
                        ? "numeric"
                        : undefined
                    }
                    maxLength={
                      name === "mobile"
                        ? 10
                        : undefined
                    }
                    className={inputClass}
                  />
                </div>
              )
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-700 dark:text-white/70">
                Vehicle
              </label>

              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className={`${inputClass} dark:bg-[#111]`}
              >
                <option value="">
                  Select vehicle
                </option>

                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle.name}
                    value={vehicle.name}
                  >
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-700 dark:text-white/70">
                Total Amount
              </label>

              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                placeholder="Enter total amount"
                min="0"
                className={inputClass}
              />
            </div>
          </div>

          {selectedVehicle && (
            <div className="mt-5 rounded-xl border border-yellow-400/20 bg-yellow-50 p-4 dark:border-yellow-400/10 dark:bg-yellow-400/[0.04]">
              <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                Selected Vehicle
              </p>

              <div className="mt-3 grid gap-2 text-sm text-gray-600 dark:text-white/60 sm:grid-cols-3">
                <p>
                  Vehicle:{" "}
                  <span className="text-gray-900 dark:text-white">
                    {selectedVehicle.name}
                  </span>
                </p>

                <p>
                  Driver:{" "}
                  <span className="text-gray-900 dark:text-white">
                    {selectedVehicle.driver}
                  </span>
                </p>

                <p>
                  Vehicle No:{" "}
                  <span className="text-gray-900 dark:text-white">
                    {VEHICLE_NUMBER}
                  </span>
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-400/20 bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-400/5 dark:text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-yellow-400 px-5 py-3.5 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading
              ? "Generating Bill..."
              : "Generate Bill"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Bill;