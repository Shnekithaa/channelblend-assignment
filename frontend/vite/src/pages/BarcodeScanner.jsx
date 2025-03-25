import { useState, useEffect, useRef } from "react";
import { useZxing } from "react-zxing";
import { motion } from "framer-motion";
import { Clipboard, Check, Upload, Trash2, Settings } from "lucide-react";
import { 
  BrowserMultiFormatReader, 
  BarcodeFormat, 
  DecodeHintType,
  MultiFormatReader,
  HybridBinarizer,
  BinaryBitmap
} from "@zxing/library";

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState([
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.PDF_417
  ]);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  // Create format selection options
  const formatOptions = [
    { value: BarcodeFormat.QR_CODE, label: "QR Code" },
    { value: BarcodeFormat.CODE_128, label: "Code 128" },
    { value: BarcodeFormat.CODE_39, label: "Code 39" },
    { value: BarcodeFormat.EAN_13, label: "EAN-13" },
    { value: BarcodeFormat.EAN_8, label: "EAN-8" },
    { value: BarcodeFormat.UPC_A, label: "UPC-A" },
    { value: BarcodeFormat.UPC_E, label: "UPC-E" },
    { value: BarcodeFormat.DATA_MATRIX, label: "Data Matrix" },
    { value: BarcodeFormat.PDF_417, label: "PDF 417" },
    { value: BarcodeFormat.AZTEC, label: "Aztec" },
    { value: BarcodeFormat.ITF, label: "ITF" },
    { value: BarcodeFormat.CODABAR, label: "Codabar" }
  ];

  // Create hints for the ZXing library
  const createHints = () => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, selectedFormats);
    hints.set(DecodeHintType.TRY_HARDER, true);
    return hints;
  };

  // Initialize barcode scanner with improved configuration
  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log("Decoded result:", result);
      setScannedResult(result.getText());
      // Play success sound
      try {
        const audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAYGBgYGBgYGBgYGBgYGBgkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg//////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAX/");
        audio.play().catch(e => console.log("Audio play failed:", e));
      } catch (e) {
        console.log("Audio creation failed:", e);
      }
    },
    onError(error) {
      if (error.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permissions.");
      } else if (error.name === "OverconstrainedError") {
        setError("Camera not supported. Try using a different device.");
      } else {
        // Don't show transient errors during scanning
        if (!scanning) {
          setError("Error accessing the camera.");
        }
      }
    },
    constraints: {
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 10 }, // Lower frameRate for better detection
      },
    },
    timeBetweenDecodingAttempts: 200, // Faster attempts
    hints: createHints(),
    paused: !scanning, // Ensure scanner only runs when scanning is active
  });

  // Update hints when selected formats change
  useEffect(() => {
    if (ref.current) {
      // Force a remount of the scanner by toggling scanning
      if (scanning) {
        setScanning(false);
        setTimeout(() => setScanning(true), 100);
      }
    }
  }, [selectedFormats]);

  // Toggle format selection
  const toggleFormat = (format) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter(f => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };

  // Start scanning function
  const startScanning = () => {
    console.log("Starting scanning with formats:", selectedFormats);
    setScannedResult("");
    setScanning(true);
    setError(null);
  };

  // Stop scanning and turn off the camera properly
  const stopScanning = () => {
    console.log("Stopping scanning...");
    setScanning(false);
    setError(null);

    // Clean up the video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
      videoRef.current.srcObject = null;
    }
  };

  // Cleanup effect to stop the camera when unmounting
  useEffect(() => {
    return () => {
      if (scanning) {
        stopScanning();
      }
    };
  }, [scanning]);

  // Effect to properly sync the video ref with the scanner ref
  useEffect(() => {
    if (scannerRef.current) {
      videoRef.current = scannerRef.current;
    }
  }, [scannerRef.current]);

  // Copy scanned result to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(scannedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Clear scanned result
  const clearResults = () => {
    setScannedResult("");
    setCopied(false);
  };

  // Handle file upload and scan barcode from image
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Stop scanning if active
    if (scanning) {
      stopScanning();
    }

    setError(null);
    
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const imageUrl = reader.result;
        
        // Create a new browser multi-format reader with our hints
        const hints = createHints();
        const codeReader = new BrowserMultiFormatReader(hints);
        
        try {
          // Try to decode directly from the URL
          const result = await codeReader.decodeFromImageUrl(imageUrl);
          setScannedResult(result.getText());
        } catch (err) {
          console.error("Failed with direct method, trying with canvas:", err);
          
          // Create an image element
          const img = new Image();
          img.onload = async () => {
            // Try multiple scales for better detection
            const scales = [1.0, 1.5, 0.75, 2.0, 0.5];
            let decoded = false;
            
            for (const scale of scales) {
              if (decoded) break;
              
              try {
                // Create a canvas and draw the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                
                // Draw and get image data
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Try to use the convenience method first
                try {
                  const result = await codeReader.decodeFromCanvas(canvas);
                  setScannedResult(result.getText());
                  decoded = true;
                  break;
                } catch (canvasErr) {
                  console.log(`Failed at scale ${scale} with canvas method`);
                }
              } catch (scaleErr) {
                console.error(`Error at scale ${scale}:`, scaleErr);
              }
            }
            
            if (!decoded) {
              setError("No barcode found. Try a clearer image or different barcode type.");
            }
          };
          
          img.src = imageUrl;
        }
      } catch (err) {
        console.error("Error processing image:", err);
        setError("Failed to process the image. Try a clearer photo or different barcode type.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Barcode Scanner
          </h2>
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
          >
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <motion.div 
            className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-medium mb-2">Barcode Types:</h3>
            <div className="flex flex-wrap gap-2">
              {formatOptions.map((format) => (
                <button
                  key={format.value}
                  onClick={() => toggleFormat(format.value)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedFormats.includes(format.value)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Start Scanning Button */}
        {!scanning && (
          <motion.button
            onClick={startScanning}
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md shadow-md hover:bg-blue-700 transition-all"
            whileTap={{ scale: 0.95 }}
            disabled={selectedFormats.length === 0}
          >
            Start Scanning
          </motion.button>
        )}

        {/* File Upload Button */}
        <label
          className={`w-full flex items-center justify-center py-2 mt-4 rounded-md shadow-md cursor-pointer transition-all ${
            scanning
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={scanning}
          />
        </label>

        {/* Scanner Component */}
        {scanning && (
          <motion.div
            className="relative mt-4 border border-gray-300 rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={stopScanning}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all z-10"
            >
              ✖
            </button>

            {/* Error Handling */}
            {error ? (
              <div className="p-4 text-red-600 text-center">{error}</div>
            ) : (
              <div className="relative">
                {/* Video Element for Scanning */}
                <video
                  ref={(node) => {
                    if (node) {
                      ref.current = node;
                      scannerRef.current = node;
                    }
                  }}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 border-4 border-blue-500 m-6 pointer-events-none"></div>
              </div>
            )}

            <p className="mt-2 text-sm text-gray-500 text-center">
              Align the barcode within the frame to scan
            </p>
          </motion.div>
        )}

        {/* Display Scanned Result */}
        {scannedResult && (
          <motion.div
            className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-md flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-medium text-gray-700 break-all max-w-[250px] text-center">
              {scannedResult}
            </span>

            {/* Copy & Delete Buttons */}
            <div className="mt-3 flex gap-3">
              <button onClick={copyToClipboard} className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all flex items-center">
                {copied ? <Check className="text-green-600 w-5 h-5" /> : <Clipboard className="text-gray-700 w-5 h-5" />}
                <span className="ml-1 text-sm">{copied ? "Copied" : "Copy"}</span>
              </button>

              <button onClick={clearResults} className="p-2 bg-red-200 rounded-md hover:bg-red-300 transition-all flex items-center">
                <Trash2 className="text-red-600 w-5 h-5" />
                <span className="ml-1 text-sm">Clear</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Troubleshooting Tips */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Scanning Tips:</h3>
          <ul className="text-xs text-gray-600 list-disc pl-4">
            <li>Ensure good lighting on the barcode</li>
            <li>Hold camera steady at appropriate distance</li>
            <li>Select the correct barcode type in settings</li>
            <li>For image uploads, use clear, well-lit photos</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}