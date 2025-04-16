

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiBed, BiBath, BiCar, BiMap, BiCalendar, BiUser, BiCube } from "react-icons/bi";
import { AiOutlineEye, AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import { MdOutlineCurrencyRupee, MdElevator, MdOutlineChair } from "react-icons/md";
import { TbArrowLeftRight } from "react-icons/tb";
import { BsGraphUp, BsBank } from "react-icons/bs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { RiLayoutLine } from "react-icons/ri";
import { FaFacebook, FaRegHeart , FaLinkedin, FaPhone, FaRupeeSign, FaShareAlt, FaTwitter, FaUserAlt, FaWhatsapp } from "react-icons/fa";
import icon1 from './Assets/ico_interest_xd.png';
import icon2 from './Assets/ico_report_soldout_xd.png';
import icon3 from './Assets/help1.png';
// import contact from '../Assets/contact.png';
import {  FaBalanceScale, FaFileAlt, FaGlobeAmericas, FaMapMarkerAlt, FaDoorClosed, FaMapSigns } from "react-icons/fa";
import { MdApproval, MdTimer, MdHomeWork, MdHouseSiding, MdOutlineKitchen, MdEmail, MdLocationCity, MdOutlineAccessTime , MdPhone } from "react-icons/md";
import {  BsBarChart } from "react-icons/bs";
import { BiRuler, BiBuilding, BiStreetView } from "react-icons/bi";
import { GiStairs, GiForkKnifeSpoon, GiWindow } from "react-icons/gi";
import { TiContacts } from "react-icons/ti";
import contact from './Assets/contact.png';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
// import { ToWords } from 'to-words';


import { ToWords } from 'to-words';



const Detail = () => {


  const [showModal, setShowModal] = useState(false);
  const [showOwnerContact, setShowOwnerContact] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [postedUserPhoneNumber, setPostedUserPhoneNumber] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [favoritedUserPhoneNumbers, setFavoritedUserPhoneNumbers] = useState([]);


  const [imageCount, setImageCount] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  // const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const location = useLocation();
  const { ppcId, phoneNumber } = location.state || {};

  const [price, setPrice] = useState("");
  const [viewCount, setViewCount] = useState(0);

  const [isHeartClicked, setIsHeartClicked] = useState(() => {
    // Check if there's a saved state in localStorage for this ppcId
    const storedState = localStorage.getItem(`isHeartClicked-${ppcId}`);
    console.log(`Initializing state for ppcId ${ppcId}:`, storedState);
    return storedState ? JSON.parse(storedState) : false;
  });


   // State to track if each action has been completed
 const [interestClicked, setInterestClicked] = useState(
  JSON.parse(localStorage.getItem(`interestSent-${ppcId}`)) || false
);
const [soldOutClicked, setSoldOutClicked] = useState(
  JSON.parse(localStorage.getItem(`soldOutReported-${ppcId}`)) || false
);
const [propertyClicked, setPropertyClicked] = useState(
  JSON.parse(localStorage.getItem(`propertyReported-${ppcId}`)) || false
);
const [helpClicked, setHelpClicked] = useState(
  JSON.parse(localStorage.getItem(`helpRequested-${ppcId}`)) || false
);




// Fetch image count for the property based on ppcId
const fetchImageCount = async () => {
  if (!ppcId) {
    console.warn("Property ID (ppcId) is required");
    return;
  }

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/uploads-count`, 
      { params: { ppcId } } // Pass only ppcId as the query parameter
    );

    setImageCount(response.data.uploadedImagesCount);
    setUploadedImages(response.data.uploadedImages);
  } catch (error) {
    console.error("Error fetching uploaded images count:", error);
  }
};

  // Fetch property views
  const fetchPropertyViews = async () => {
    if (!ppcId) {
      console.warn("Missing ppcId");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/property-views/${ppcId}`
      );
      setViewCount(response.data.views);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch property views.";
      toast.error(errorMessage);
      console.error("Error fetching property views:", error);
    }
  };

  useEffect(() => {
    if (ppcId || phoneNumber) {
      fetchImageCount();
    }
  }, [phoneNumber, ppcId]);

  useEffect(() => {
    if (ppcId) {
      fetchPropertyViews();
    }
  }, [ppcId]);

  useEffect(() => {
    const savedState = localStorage.getItem("isHeartClicked");
    if (savedState) {
      setIsHeartClicked(JSON.parse(savedState));
    }

    if (ppcId || phoneNumber) {
      fetchImageCount();
    }
  }, [phoneNumber, ppcId]);





    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/offer`, { price ,phoneNumber ,ppcId  });
            alert('Offer saved successfully');
            setPrice(''); // Clear the input field after successful submission
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving offer');
        }
    };


  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-data?ppcId=${ppcId}`);
        setPropertyDetails(response.data.user);
      } catch (err) {
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    if (ppcId) fetchPropertyData();
  }, [ppcId]);



  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  


  const maxImages = 15;
      const [currentIndex, setCurrentIndex] = useState(1);
    
      const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.realIndex + 1);
      };
  const closeModal = () => setShowModal(false);

  // const handleOwnerContactClick = () => {
  //   setShowOwnerContact(true); // Show the owner contact modal
  // };

  const handleOwnerContactClick = async () => {
    try {
  
      if (!phoneNumber || !ppcId) {
        setMessage("Phone number and Property ID are required.");
        return;
      }
  
      // Send data to the backend to request owner contact details
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        phoneNumber,
        ppcId,
      });
  
      // Get the postedUserPhoneNumber from the response
      const postedUserPhoneNumber = response.data.postedUserPhoneNumber;
  
      // Handle the response message and display the property owner's phone number
      setMessage(`Owner's Phone: ${postedUserPhoneNumber}`);
      setPostedUserPhoneNumber(postedUserPhoneNumber); // Save the phone number for later use/display
      // setShowOwnerContact(true);  

      toggleContactDetails(); 
    } catch (error) {
      console.error("API error:", error.response ? error.response.data : error);
      setMessage("Failed to fetch owner contact details.");
    }
  };

  // const toggleContactDetails = () => {
  //   setShowContactDetails(!showContactDetails);
  // };

  const toggleContactDetails = () => {
    setShowContactDetails(prevState => !prevState);
  };


  const closeOwnerContactModal = () => {
    setShowOwnerContact(false); 
  };

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>{error}</p>;
  if (!propertyDetails) return <p>No property details found.</p>;


  const images = propertyDetails.photos && propertyDetails.photos.length > 0
    ? propertyDetails.photos.map((photo) => `http://localhost:5000/${photo}`)
    : ["https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"];

 
    
  const propertyDetailsList = [
        { heading: true, label: "Basic Property Info" }, // Heading 1
        { icon: <MdHomeWork />, label: "Property Mode", value:  propertyDetails.propertyMode},
        { icon: <MdHouseSiding />, label: "Property Type", value: propertyDetails.propertyType },
        // { icon: <MdOutlineCurrencyRupee />, label: "Price", value: propertyDetails.price },
        // { icon: <FaBalanceScale />, label: "Negotiation", value: propertyDetails.negotiation },
        { icon: <AiOutlineColumnWidth />, label: "Length", value: propertyDetails.length },
        { icon: <AiOutlineColumnHeight />, label: "Breadth", value: propertyDetails.breadth  },
        // { icon: <RiLayoutLine />, label: "Total Area", value: propertyDetails.totalArea},
        {
          icon: <RiLayoutLine />,
          label: "Total Area",
          value: `${propertyDetails.totalArea} ${propertyDetails.areaUnit}`, // Combined value
        },
        // { icon: <BiRuler />, label: "Area Unit", value: propertyDetails.areaUnit },
        { icon: <FaUserAlt />, label: "Ownership", value: propertyDetails.ownership },
        { icon: <MdApproval />, label: "Property Approved", value: propertyDetails.propertyApproved },
        { icon: <MdTimer />, label: "Property Age", value: propertyDetails.propertyAge },
        { icon: <BsBank />, label: "Bank Loan", value: propertyDetails.bankLoan },

        { label: "No.of.Views", value: "5", icon: <AiOutlineEye /> },

        { heading: true, label: "Property Features" }, // Heading 1
        { icon: <BiBed />, label: "Bedrooms", value: propertyDetails.bedrooms },

        { icon: <GiStairs />, label: "Floor No", value:propertyDetails.floorNo },
        { icon: <GiForkKnifeSpoon />, label: "Kitchen", value: propertyDetails.kitchen},
        { icon: <MdOutlineKitchen />, label: "Kitchen Type", value: propertyDetails.kitchenType },
        { icon: <GiWindow />, label: "Balconies", value: propertyDetails.balconies},
        { icon: <BiCube />, label: "Floors", value: propertyDetails.numberOfFloors },
    { label: "western", value: propertyDetails.western, icon: <BiBath /> },
    { label: "attached", value: propertyDetails.attachedBathrooms, icon: <BiBath /> },

        { icon: <BiCar />, label: "Car Park", value: propertyDetails.carParking },
        { icon: <MdElevator />, label: "Lift", value: propertyDetails.lift },
        { heading: true, label: "Other details" }, // Heading 2
    
        { icon: <MdOutlineChair />, label: "Furnished", value: propertyDetails.furnished },
        { icon: <TbArrowLeftRight />, label: "Facing", value: propertyDetails.facing },

        { icon: <BsGraphUp />, label: "Sale Mode", value: propertyDetails.salesMode },
        { icon: <BsBarChart />, label: "Sales Type", value: propertyDetails.salesType },
        { icon: <BiUser />, label: "Posted By", value: propertyDetails.postedBy },
        // { icon: <AiOutlineEye />, label: "No.Of.Views", value: "1200" },
        { icon: <BiCalendar />, label: "Posted On", value: "Dec 20, 2024" },
        { heading: true, label: "Description" }, // Heading 3
        { icon: <FaFileAlt />, value: propertyDetails.description },
      
        { heading: true, label: "Property Location Info" }, // Heading 4
      
        { icon: <BiMap />, label: "Location", value: "New York, USA" },
        { icon: <FaGlobeAmericas />, label: "Country", value: propertyDetails.country },
        { icon: <BiBuilding />, label: "State", value: propertyDetails.state },
        { icon: <MdLocationCity />, label: "City", value: propertyDetails.city },
        { icon: <FaMapMarkerAlt />, label: "District", value:  propertyDetails.district},
        { icon: <FaMapSigns />, label: "Nagar", value: propertyDetails.nagar },
        { icon: <FaDoorClosed />, label: "Door Number", value: propertyDetails.doorNumber },
        { icon: <BiStreetView />, label: "Street Name", value: propertyDetails.streetName },

      ];




const handleInterestClick = async () => {
  if (!phoneNumber || !ppcId) {
    toast.error("Phone number and Property ID are required.");
    return;
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-interests`, {
      phoneNumber,
      ppcId,
    });

    const { message, status, alreadySaved } = response.data;

    if (status === "sendInterest") {
      toast.success(message);
      setInterestClicked(true); // Update state
      localStorage.setItem(`interestSent-${ppcId}`, JSON.stringify(true)); // Store in localStorage
    } else if (status === "alreadySaved") {
      toast.info(message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong.";
    toast.error(errorMessage);
  }
};

const handleReportSoldOut = async () => {
  if (!phoneNumber || !ppcId) {
    toast.error("Phone number and Property ID are required.");
    return;
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/report-sold-out`, {
      phoneNumber,
      ppcId,
    });

    const { message, status, postedUserPhoneNumber } = response.data;

    if (status === "soldOut") {
      toast.success(message); // Dynamic success message
      setMessage(`Property reported as sold out. Owner's Phone: ${postedUserPhoneNumber}`); // Update UI message
      setPostedUserPhoneNumber(postedUserPhoneNumber); // Store owner's phone in state

      // Update state and localStorage
      setSoldOutClicked(true);
      localStorage.setItem(`soldOutReported-${ppcId}`, JSON.stringify(true));
    } else if (status === "alreadyReported") {
      toast.info("This property is already reported as sold out.");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to report property as sold out.";
    toast.error(errorMessage); // Display error message
    console.error(error);
  }
};



const handleReportProperty = async () => {
  if (!phoneNumber || !ppcId) {
    toast.error("Phone number and Property ID are required."); // Feedback for missing inputs
    setMessage("Phone number and Property ID are required.");
    return;
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/report-property`, {
      phoneNumber,
      ppcId,
    });

    const { status, message, postedUserPhoneNumber } = response.data;

    if (status === "reportProperties") {
      // Success: Property reported
      toast.success(message); // Dynamic success message
      setMessage(`Property reported. Owner's Phone: ${postedUserPhoneNumber}`); // Update UI message
      setPostedUserPhoneNumber(postedUserPhoneNumber); // Save postedUserPhoneNumber in state
      
      // Update state and localStorage
      setPropertyClicked(true);
      localStorage.setItem(`propertyReported-${ppcId}`, JSON.stringify(true));
    } else if (status === "alreadySaved") {
      // Info: Property already reported
      toast.info("This property has already been reported."); // Feedback to user
      setMessage("This property has already been reported."); // Update UI message
    }
  } catch (error) {
    // Handle errors
    const errorMessage = error.response?.data?.message || "Failed to report the property.";
    toast.error(errorMessage); // Display error to the user
    setMessage(errorMessage); // Update UI message
    console.error("Error reporting property:", error.response?.data || error);
  }
};





const handleNeedHelp = async () => {
  try {
    if (!phoneNumber || !ppcId) {
      setMessage("Phone number and Property ID are required.");
      return;
    }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/need-help`, {
      phoneNumber,
      ppcId,
    });

    const { status, message, postedUserPhoneNumber } = response.data;

    if (status === "needHelp") {
        toast.success(message); // Dynamic success message
        setMessage(`NeedHelp request sent. Owner's Phone: ${postedUserPhoneNumber}`);
        setPostedUserPhoneNumber(postedUserPhoneNumber);
        setHelpClicked(true);
        localStorage.setItem(`helpRequested-${ppcId}`, JSON.stringify(true));
    } else if (status === "alreadySaved") {
        toast.info(message); // Dynamic already-favorited message
    }
  } catch (error) {
    
    toast.error(error.response?.data?.message || "Failed to send interest."); // Dynamic error handling
  }
};


const cards = [
  { 
    img: icon1, 
    text: interestClicked ? "Interest Sent" : "Send Your Interest", 
    onClick: handleInterestClick 
  },
  { 
    img: icon2, 
    text: soldOutClicked ? "Sold Out Reported" : "Report Sold Out", 
    onClick: handleReportSoldOut 
  },
  { 
    img: icon2, 
    text: propertyClicked ? "Property Reported" : "Report Property", 
    onClick: handleReportProperty 
  },
  { 
    img: icon3, 
    text: helpClicked ? "Help Requested" : "Need Help", 
    onClick: handleNeedHelp 
  },
];

  

const handleHeartClick = async () => {
  if (!phoneNumber || !ppcId) {
      toast.error("Phone number and Property ID are required.");
      return;
  }

  const apiEndpoint = isHeartClicked
      ? `${process.env.REACT_APP_API_URL}/remove-favorite`
      : `${process.env.REACT_APP_API_URL}/add-favorite`;

  try {
      const response = await axios.post(apiEndpoint, { phoneNumber, ppcId });
      const { status, message, postedUserPhoneNumber } = response.data;

      if (status === "favorite") {
          toast.success(message);
          setIsHeartClicked(true);
          setMessage(`Favorite request sent. Owner's Phone: ${postedUserPhoneNumber}`);
          setPostedUserPhoneNumber(postedUserPhoneNumber);
          localStorage.setItem(`isHeartClicked-${ppcId}`, JSON.stringify(true)); // Store status
      } else if (status === "favoriteRemoved") {
          toast.success(message);
          setIsHeartClicked(false);
          setMessage("");
          setPostedUserPhoneNumber("");
          localStorage.setItem(`isHeartClicked-${ppcId}`, JSON.stringify(false));
      } else if (status === "alreadySaved") {
          toast.info(message);
          setIsHeartClicked(true);
      }
  } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setIsHeartClicked(false);
      localStorage.setItem(`isHeartClicked-${ppcId}`, JSON.stringify(false));
  }
};


 

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };
  const toWords = new ToWords({
    localeCode: 'en-IN', // Indian numbering system
    converterOptions: {
      currency: false,
      ignoreDecimal: true,
    }
  });
  
 
  const formattedPrice = propertyDetails && propertyDetails.price
  ? new Intl.NumberFormat('en-IN').format(propertyDetails.price) // Indian-style number format
  : "N/A"; // fallback if price is undefined

const priceInWords = propertyDetails && propertyDetails.price
  ? toWords.convert(propertyDetails.price) + " rupees" // Convert the price to words
  : "N/A"; // fallback if price is undefined

  return (
    <div
      className="container mt-4 p-4"
      // style={{ fontFamily: "Inter, sans-serif", height: "100vh", width: "450px" }}
    >
     

      {showShareOptions && (
        <div
          className="d-flex flex-column gap-2 mt-2 p-3"
          style={{
            position: "absolute",
            top: "90px",
            right: "42%",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 10,
          }}
        >
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2" style={{ textDecoration: "none", color: "#3b5998" }}>
            <FaFacebook /> Facebook
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2" style={{ textDecoration: "none", color: "#25D366" }}>
            <FaWhatsapp /> WhatsApp
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2" style={{ textDecoration: "none", color: "#1DA1F2" }}>
            <FaTwitter /> Twitter
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2" style={{ textDecoration: "none", color: "#0077b5" }}>
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      )}


 <div className="mb-4">
       <Swiper
        loop={true}
        navigation={true}
        modules={[Navigation]}
        onSlideChange={handleSlideChange}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div onClick={() => handleImageClick(index)}
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "200px",
                width: "100%",
                overflow: "hidden",
                borderRadius: "8px",
                margin: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                
              }}
            >
              <img
                src={image}
                alt={`Property Image ${index + 1}`}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
{/* Apply inline styles directly to Swiper navigation buttons */}
<style>
  {`
    .swiper-button-next, .swiper-button-prev {
      color: white !important;
      font-size: 24px !important;
    }
  `}
</style>
      {/* Image count display */}
      <div className="text-center mt-2">
        {Math.min(currentIndex, images.length)}/{maxImages}
        {/* {imageCount} */}
      </div>
    </div>
        <p className="text-start" style={{ color: "black" }}>
       <strong>{propertyDetails.propertyMode} |  {propertyDetails.propertyType}</strong>  
        </p>
         <h6
        className="p-2 mt-3"
        style={{
          backgroundColor: "rgb(47,116,127)",
                    color: "white",
                    borderRadius: "5px",
                    width: "27%",
                    fontSize:'12px'
        }}
      >
        PPC_ID : {propertyDetails.ppcId}
      </h6>
      <div className="d-flex justify-content-between align-items-center">
      <p style={{
    color: "#4F4B7E",
    fontWeight: 'bold',
    fontSize: "26px"
  }}>
    <MdOutlineCurrencyRupee size={26} /> {formattedPrice}
    <span style={{ fontSize: '14px', color: "#30747F", marginLeft: "10px" }}>
       Negotiation: {propertyDetails.negotiation}
    </span>
  </p>
  {/* ({priceInWords})  */}

        <div className="d-flex gap-3">
          <FaShareAlt
            style={{ cursor: "pointer", fontSize: "20px", color: "#30747F" }}
            onClick={handleShareClick}
          />
          <FaRegHeart 
            style={{ cursor: "pointer", fontSize: "20px", color: isHeartClicked ? "red" : "#30747F" }}
            onClick={handleHeartClick}
          />
        </div>
      </div>
      <p>({priceInWords})</p>

        <h4 className="fw-bold mt-3">Make an offer</h4>
            <form onSubmit={handleSubmit} className="d-flex">
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                    <FaRupeeSign style={{ position: 'absolute', left: '10px', color: '#30747F' }} />
                    <input 
                        type="number" 
                        className="w-75 mt-2" 
                        placeholder="Make an offer" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ padding: "8px 12px 8px 30px", borderRadius: "4px", border: "1px solid #30747F", marginRight: "10px", width: "100%" }} 
                    />
                    <button 
                        type="submit" 
                        style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #30747F", backgroundColor: "#30747F", color: "#fff" }}
                    >
                        Submit
                    </button>
                </div>
            </form>

      <div className="row g-3 mt-3">



{propertyDetailsList.map((detail, index) => (
  detail.heading ? (
    // 🟢 Render Heading as Full-Width (col-12)
    <div key={index} className="col-12">
      <h4
        className="mb-3 fw-bold"
        style={{ color: "#000000", fontFamily: "Inter, sans-serif", fontSize: "16px" }}
      >
        {detail.label}
      </h4>
    </div>
  ) : (
    // 🔹 Default col-md-6 for all items EXCEPT description
    <div key={index} className={detail.value === propertyDetails.description ? "col-12" : "col-md-6"}>
      <div
        className="d-flex align-items-center border rounded p-3"
        style={{
          backgroundColor: "#F9F9F9", // Default background
          width: "100%",
        }}
      >
        <span className="me-3 fs-3" style={{ color: "#30747F" }}>
          {detail.icon}
        </span>
        <div>
          <h6 className="mb-1">{detail.label}</h6>
          <p
            className="mb-0"
            style={{
              // backgroundColor: detail.value === propertyDetails.description ? "#DFF6FF" : "transparent", // 🔵 Light blue background for Description only
              padding: "10px",
              borderRadius: "5px",
              width: "100%", // Ensures full width
            }}
          >
            {detail.value || "N/A"}
          </p>
        </div>
      </div>
    </div>
  )
))}

<div>
      <h5 className="pt-3 fw-bold"> Video </h5>
      <video width="100%" height="auto" controls>
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

      {/* Contact Info Section */}
      <h5 className="pt-3 fw-bold">Contact Info</h5>
     

<button 
  className="btn rounded-1 p-2 text-center d-flex align-items-center" 
  style={{ background: 'transparent', border: '1px solid #30747F', color: '#30747F' }} 
  onClick={handleOwnerContactClick}
>
  <img 
    src={contact} 
    alt="Contact Icon" 
    style={{ width: '20px', height: '20px', marginRight: '8px' }} 
  />
  View owner contact details
</button>
      {showContactDetails && (
        <div className="mt-3">
          <p style={{color:'red'}}><strong style={{color:'black'}}>Name:</strong> {propertyDetails.ownerName || "Not Available"}</p>
          {/* <p><strong>Phone Number:</strong> {propertyDetails.phoneNumber || "Not Available"}</p> */}
          <p style={{color:'red'}}><strong style={{color:'black'}}>Phone Number:</strong> <a href={`tel:${propertyDetails.phoneNumber}`} style={{ color: "red", textDecoration: "none" }}>{propertyDetails.phoneNumber || "Not Available"}</a></p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>Alternate Number:</strong> {propertyDetails.phoneNumber || "Not Available"}</p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>email:</strong> {propertyDetails.email || "Not Available"}</p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>Address:</strong> {propertyDetails.city || "Not Available"}</p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>Best Time to Call:</strong> {propertyDetails.bestTimeToCall || "Not Available"}</p>

          <span className="d-flex justify-content-between align-items-center">
  <button
    className="btn btn-link p-0"
    style={{ color: "#30747F", textDecoration: "underline" }}
    onClick={toggleContactDetails}
  >
    Show less
  </button>

  <button
    className="btn btn-outline-#30747F mt-2 d-flex align-items-center gap-2"
    style={{ color: "white",backgroundColor:" #30747F", border: "1px solid #30747F" }}
    onClick={() => (window.location.href = `tel:${propertyDetails.phoneNumber}`)}
  >
    <FaPhone /> Call
  </button>
</span>


        </div>
      )}

      {/* Image modal */}
      {showModal && (
        <div className="modal show d-block" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={closeModal}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <img src={images[currentImageIndex]} alt={`Large Property Image`} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="modal-footer">
                <p className="text-muted">Total Images: {images.length}</p>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}



      <div className="container my-5" style={{ maxWidth: "450px" }}>
        <div className="row justify-content-center">
          {cards.map((card, index) => (
            <div key={index} className="col-3 d-flex justify-content-center">
              <div
                className="card text-center shadow"
                style={{
                  width: "100px",
                  height: "80px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: 'none'
                }}
                onClick={card.onClick}
              >
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50%", width: "100%" }}>
                  <img
                    src={card.img}
                    alt={`Card ${index + 1}`}
                    style={{ width: "30px", height: "30px", objectFit: "cover", marginTop: "5px" }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50%", width: "100%", textAlign: "center" }}>
                  <p className="card-text" style={{ fontSize: "10px", margin: "0", wordWrap: "break-word", overflow: "visible" }}>
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* {message && <p>{message}</p>} */}
    </div>
    <ToastContainer />
    </div>
  );
};

export default Detail;
