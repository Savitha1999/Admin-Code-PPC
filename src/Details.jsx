


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiBed, BiBath, BiCar, BiMap, BiCalendar, BiUser, BiCube } from "react-icons/bi";
import { AiOutlineEye, AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import { MdOutlineCurrencyRupee, MdElevator, MdOutlineChair, MdCall } from "react-icons/md";
import { TbArrowLeftRight } from "react-icons/tb";
import { BsGraphUp, BsBank } from "react-icons/bs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import { RiLayoutLine } from "react-icons/ri";
import { FaFacebook, FaRegHeart , FaLinkedin, FaPhone, FaRupeeSign, FaShareAlt, FaTwitter, FaUserAlt, FaWhatsapp, FaHeart, FaArrowLeft, FaClock, FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import icon1 from './Assets/ico_interest_xd.png';
import icon2 from './Assets/ico_report_soldout_xd.png';
import icon4 from './Assets/Shortlist Bike-01.png';

import icon3 from './Assets/help1.png';
// import contact from '../Assets/contact.png';
import {  FaBalanceScale, FaFileAlt, FaGlobeAmericas, FaMapMarkerAlt, FaDoorClosed, FaMapSigns } from "react-icons/fa";
import { MdApproval, MdTimer, MdHomeWork, MdHouseSiding, MdOutlineKitchen, MdEmail, MdLocationCity, MdOutlineAccessTime , MdPhone } from "react-icons/md";
import {  BsBarChart } from "react-icons/bs";
import { BiRuler, BiBuilding, BiStreetView } from "react-icons/bi";
import { GiStairs, GiForkKnifeSpoon, GiWindow } from "react-icons/gi";
import { TiContacts } from "react-icons/ti";
import contact from './Assets/contact.png';
// import { ToWords } from 'to-words';

import promotion from './Assets/PUC_App Promotion_2.png'
import { ToWords } from 'to-words';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import moment from "moment";
import { useSelector } from "react-redux";

const Details = () => {
  const [imageError, setImageError] = useState({});
  const [showOptions, setShowOptions] = useState(false);

     
  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "Details",
       viewTime: moment().format("YYYY-MM-DD HH:mm:ss"), // optional, backend already handles it


     });
     console.log("Dashboard view recorded");
   } catch (err) {
     console.error("Failed to record dashboard view:", err);
   }
 };

 if (adminName) {
   recordDashboardView();
 }
}, [adminName]);

  const handleImageError = (index) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };
  const [videoUrl, setVideoUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);  // State for controlling the popup/modal

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
  const [property, setProperty] = useState(null);
  const [viewedProperties, setViewedProperties] = useState([]);

  const [popupMessage, setPopupMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const [imageCount, setImageCount] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  // const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [interestClicked, setInterestClicked] = useState(false);

  const location = useLocation();
  const { ppcId } = useParams();

  const {  phoneNumber } = location.state || {};
  const [price, setPrice] = useState("");
  const [properties, setProperties] = useState([]);
  
  const [photoRequested, setPhotoRequested] = useState(
    JSON.parse(localStorage.getItem(`photoRequested-${property?.ppcId}`)) || false
  );
  // const [offerPrice, setofferPrice] = useState("");
  const [viewCount, setViewCount] = useState(0);

  const [isHeartClicked, setIsHeartClicked] = useState(() => {
    // Check if there's a saved state in localStorage for this ppcId
    const storedState = localStorage.getItem(`isHeartClicked-${ppcId}`);
    console.log(`Initializing state for ppcId ${ppcId}:`, storedState);
    return storedState ? JSON.parse(storedState) : false;
  });


  const navigate = useNavigate();

  // Load interest state from localStorage when the component mounts
  useEffect(() => {
    const interestSaved = localStorage.getItem(`interestSent-${ppcId}`);
    if (interestSaved) {
      setInterestClicked(true);
    }
  }, [ppcId]);

  
//    // State to track if each action has been completed
//  const [interestClicked, setInterestClicked] = useState(
//   JSON.parse(localStorage.getItem(`interestSent-${ppcId}`)) || false
// );


const [soldOutClicked, setSoldOutClicked] = useState(
  JSON.parse(localStorage.getItem(`soldOutReported-${ppcId}`)) || false
);
const [propertyClicked, setPropertyClicked] = useState(
  JSON.parse(localStorage.getItem(`propertyReported-${ppcId}`)) || false
);
const [helpClicked, setHelpClicked] = useState(
  JSON.parse(localStorage.getItem(`helpRequested-${ppcId}`)) || false
);

useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }
}, [message]);


useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/properties`);
      setProperties(response.data.data);
    } catch (error) {
    }
  };

  fetchProperties();
}, []);


// Fetch image count for the property based on ppcId
const fetchImageCount = async () => {
  if (!ppcId) {
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
  }
};


  useEffect(() => {
    if (ppcId || phoneNumber) {
      fetchImageCount();
    }
  }, [phoneNumber, ppcId]);

  // useEffect(() => {
  //   if (ppcId) {
  //     fetchPropertyViews();
  //   }
  // }, [ppcId]);

  useEffect(() => {
    const savedState = localStorage.getItem("isHeartClicked");
    if (savedState) {
      setIsHeartClicked(JSON.parse(savedState));
    }

    if (ppcId || phoneNumber) {
      fetchImageCount();
    }
  }, [phoneNumber, ppcId]);



const fetchPropertyDetails = async (ppcId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/property/${ppcId}`);
    setProperty(response.data);
  } catch (error) {
  }
};

 // Fetch property details
 useEffect(() => {
  if (ppcId) {
    fetchPropertyDetails(ppcId);
  }
}, [ppcId]);


// ✅ Fetch stored phone number from localStorage on component mount
useEffect(() => {
  const storedPhoneNumber = localStorage.getItem("userPhoneNumber");
  if (storedPhoneNumber) {
    setUserPhoneNumber(storedPhoneNumber);

    // ✅ Call API only if userPhoneNumber & ppcId exist
    if (ppcId) {
      storeUserViewedProperty(storedPhoneNumber, ppcId);
    }
  }
}, [ppcId]); // ✅ Runs only when ppcId changes

// ✅ Function to store viewed property in the database
const storeUserViewedProperty = async (phoneNumber, ppcId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user-viewed-property`,
      { phoneNumber, ppcId }
    );
  } catch (error) {
  }
};



    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/offer`, { price ,phoneNumber ,ppcId  });
          alert('Offer saved successfully');
          setPrice(''); // Clear the input field after successful submission
      } catch (error) {
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

  useEffect(() => {
    // Ensure propertyDetails is not null or undefined before accessing `video`
    if (propertyDetails?.video) {
      setVideoUrl(`http://localhost:5000/${propertyDetails.video}`);
    } else {
      setVideoUrl("http://localhost:5000/default-video-url.mp4"); // Fallback to a default video
    }
    console.log('Video URL:', videoUrl); // For debugging
  }, [propertyDetails?.video]); // Runs when `propertyDetails.video` changes
  const handleVideoPlay = () => {
    setShowPopup(true);
    console.log('Video is playing');
  };
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


  // const handleOwnerContactClick = async () => {
  //   try {
  
  //     if (!phoneNumber || !ppcId) {
  //       setMessage("Phone number and Property ID are required.");
  //       return;
  //     }
  
  //     // Send data to the backend to request owner contact details
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
  //       phoneNumber,
  //       ppcId,
  //     });
  
  //     // Get the postedUserPhoneNumber from the response
  //     const postedUserPhoneNumber = response.data.postedUserPhoneNumber;
  
  //     // Handle the response message and display the property owner's phone number
  //     setMessage(`Owner's Phone: ${postedUserPhoneNumber}`);
  //     setPostedUserPhoneNumber(postedUserPhoneNumber); // Save the phone number for later use/display
  //     // setShowOwnerContact(true);  

  //     toggleContactDetails(); 
  //   } catch (error) {
  //     setMessage("Failed to fetch owner contact details.");
  //   }
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
  ? propertyDetails.photos.map((photo) => `http://localhost:5006/${photo}`)
  : []; // Leave empty, handle default in the component

    
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
    { label: "Western", value: propertyDetails.western, icon: <BiBath /> },
    { label: "Attached", value: propertyDetails.attachedBathrooms, icon: <BiBath /> },

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
        { heading: true, label: "Description"  }, // Heading 3
        { icon: <FaFileAlt />, label: "Description" ,value: propertyDetails.description },
      
        { heading: true, label: "Property Location " }, // Heading 4
      
        // { icon: <BiMap />, label: "Location", value: "New York, USA" },
        { icon: <FaGlobeAmericas />, label: "Country", value: propertyDetails.country },
        { icon: <BiBuilding />, label: "State", value: propertyDetails.state },
        { icon: <MdLocationCity />, label: "City", value: propertyDetails.city },
        { icon: <FaMapMarkerAlt />, label: "District", value:  propertyDetails.district},
        { icon: <FaMapSigns />, label: "Nagar", value: propertyDetails.nagar },
        { icon: <FaMapMarkerAlt />, label: "Area", value: propertyDetails.area },
        { icon: <BiStreetView />, label: "Street Name", value: propertyDetails.streetName },

        { icon: <FaDoorClosed />, label: "Door Number", value: propertyDetails.doorNumber },

       
      ];





// const handleInterestClick = async () => {
//   if (!phoneNumber || !ppcId) {
//     setMessage("Phone number and Property ID are required.");
//     return;
//   }

//   try {
//     const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-interests`, {
//       phoneNumber,
//       ppcId,
//     });

//     const { message, status } = response.data;

//     if (status === "sendInterest") {
//       setMessage("Interest sent successfully!");
//       setInterestClicked(true);
//       localStorage.setItem(`interestSent-${ppcId}`, JSON.stringify(true));
//     } else if (status === "alreadySaved") {
//       setMessage("Interest already recorded for this property.");
//     }
//   } catch (error) {
//     setMessage(error.response?.data?.message || "Something went wrong.");
//   }
// };

const handleOwnerContactClick = async () => {
  try {
    if (!phoneNumber || !ppcId) {
      setMessage("Phone number and Property ID are required.");
      return;
    }

    // Check if the user has already requested this owner's contact
    const contactSaved = localStorage.getItem(`ownerContact-${ppcId}`);
    if (contactSaved) {
      setMessage("You have already requested the owner's contact.");
      return;
    }

    // Send request to fetch owner contact details
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
      phoneNumber,
      ppcId,
    });

    const { postedUserPhoneNumber, status } = response.data;

    if (status === "alreadySaved") {
      setMessage("Owner contact request is already saved.");
    } else {
      setMessage(`Owner's Phone: ${postedUserPhoneNumber}`);
      setPostedUserPhoneNumber(postedUserPhoneNumber);
      localStorage.setItem(`ownerContact-${ppcId}`, JSON.stringify(true)); // Store in localStorage
    }

    toggleContactDetails();
  } catch (error) {
    setMessage("Failed to fetch owner contact details.");
  }
};



const handleInterestClick = async () => {
  if (!phoneNumber || !ppcId) {
    setMessage("Phone number and Property ID are required.");
    return;
  }

  // Prevent multiple clicks
  if (interestClicked || localStorage.getItem(`interestSent-${ppcId}`)) {
    setMessage("Interest already recorded for this property.");
    setInterestClicked(true);
    return;
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-interests`, {
      phoneNumber,
      ppcId,
    });

    const { message, status } = response.data;

    if (status === "sendInterest") {
      setMessage("Interest sent successfully!");
      setInterestClicked(true);
      localStorage.setItem(`interestSent-${ppcId}`, JSON.stringify(true));
    } else if (status === "alreadySaved") {
      setMessage("Interest already recorded for this property.");
      setInterestClicked(true);
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Something went wrong.";
    setMessage(errMsg);
    console.error("Interest Error:", error);
  }
};


const handleReportSoldOut = async () => {
  if (!phoneNumber || !ppcId) {
    setMessage("Phone number and Property ID are required.");
    return;
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/report-sold-out`, {
      phoneNumber,
      ppcId,
    });

    const { message, status, postedUserPhoneNumber } = response.data;

    if (status === "soldOut") {
      setMessage(`Property reported as sold out. Owner's Phone: ${postedUserPhoneNumber}`);
      setPostedUserPhoneNumber(postedUserPhoneNumber);
      setSoldOutClicked(true);
      localStorage.setItem(`soldOutReported-${ppcId}`, JSON.stringify(true));
    } else if (status === "alreadyReported") {
      setMessage("This property is already reported as sold out.");
    }
  } catch (error) {
    setMessage(error.response?.data?.message || "Failed to report property as sold out.");
  }
};

const handleReportProperty = async () => {
  if (!phoneNumber || !ppcId) {
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
      setMessage(`Property reported. Owner's Phone: ${postedUserPhoneNumber}`);
      setPostedUserPhoneNumber(postedUserPhoneNumber);
      setPropertyClicked(true);
      localStorage.setItem(`propertyReported-${ppcId}`, JSON.stringify(true));
    } else if (status === "alreadySaved") {
      setMessage("This property has already been reported.");
    }
  } catch (error) {
    setMessage(error.response?.data?.message || "Failed to report the property.");
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
        setMessage(`NeedHelp request sent. Owner's Phone: ${postedUserPhoneNumber}`);
        setPostedUserPhoneNumber(postedUserPhoneNumber);
        setHelpClicked(true);
        localStorage.setItem(`helpRequested-${ppcId}`, JSON.stringify(true));
    } else if (status === "alreadySaved") {
      setMessage("This property has already been reported.");

    }
  } catch (error) {
    
  }
};



// Function to handle confirmation
const confirmActionHandler = (actionType, actionMessage) => {
  setPopupMessage(actionMessage);
  setShowPopup(true);
  setConfirmAction(() => () => {
    actionType();
    setShowPopup(false);
  });
};

const cards = [
  {
    img: icon1,
    text: interestClicked ? "Interest Sent" : "Send Your Interest",
    onClick: () => {
      if (interestClicked) {
        setMessage("Your interest is already sent.");
        return;
      }
      confirmActionHandler(handleInterestClick, "Are you sure you want to send interest?");
    },
  },
  {
    img: icon2,
    text: soldOutClicked ? "Sold Out Reported" : "Report Sold Out",
    onClick: () => {
      if (soldOutClicked) {
        setMessage("Sold out report already submitted.");
        return;
      }
      confirmActionHandler(handleReportSoldOut, "Are you sure you want to report this property as sold out?");
    },
  },
  {
    img: icon4,
    text: propertyClicked ? "Property Reported" : "Report Property",
    onClick: () => {
      if (propertyClicked) {
        setMessage("This property is already reported.");
        return;
      }
      confirmActionHandler(handleReportProperty, "Are you sure you want to report this property?");
    },
  },
  {
    img: icon3,
    text: helpClicked ? "Help Requested" : "Need Help",
    onClick: () => {
      if (helpClicked) {
        setMessage("Help request already submitted.");
        return;
      }
      confirmActionHandler(handleNeedHelp, "Are you sure you need help?");
    },
  },
];





const handleHeartClick = async () => {
  if (!phoneNumber || !ppcId) return;

  const apiEndpoint = isHeartClicked
      ? `${process.env.REACT_APP_API_URL}/remove-favorite`
      : `${process.env.REACT_APP_API_URL}/add-favorite`;

  try {
      const response = await axios.post(apiEndpoint, { phoneNumber, ppcId });
      const { status, message, postedUserPhoneNumber } = response.data;

      if (status === "favorite") {
          setIsHeartClicked(true);
          setMessage("Favorite request sent.");
          setPostedUserPhoneNumber(postedUserPhoneNumber);
          localStorage.setItem(`isHeartClicked-${ppcId}`, "true");
      } else if (status === "favoriteRemoved") {
          setIsHeartClicked(false);
          setMessage("Your favorite was removed.");
          setPostedUserPhoneNumber("");
          localStorage.setItem(`isHeartClicked-${ppcId}`, "false");
      }
  } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      
      // Specific message for already favorited/removed cases
      if (errorMessage.includes("already in your favorites")) {
          setMessage("This property is already in your favorites.");
      } else if (errorMessage.includes("not in your favorites")) {
          setMessage("This property was not in your favorites.");
      } else {
          setMessage(errorMessage);
      }

      setIsHeartClicked(isHeartClicked); // Maintain previous state
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


 
  const handlePhotoRequest = () => {
    setPopupMessage("Are you sure you want to request a photo?");
    setConfirmAction(() => confirmPhotoRequest); // Store function reference
    setShowPopup(true);
  };

  const confirmPhotoRequest = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/photo-request`, {
        ppcId: property.ppcId,
        requesterPhoneNumber: userPhoneNumber,
      });
  
      setMessage("Photo request submitted successfully!");
      setPhotoRequested(true); // Update state
      localStorage.setItem(`photoRequested-${property.ppcId}`, JSON.stringify(true)); // Save to local storage
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit photo request.");
    } finally {
      setShowPopup(false); // Close popup
      setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
    }
  };
  
  

const handlePageNavigation = () => {
  navigate('/mobileviews'); // Redirect to the desired path
};


  const toggleShareOptions = () => {
    setShowOptions(!showOptions);
  };
const currentUrl = `${window.location.origin}${location.pathname}`; // <- Works for localhost or live

  return (
    <div className="container d-flex align-items-center justify-content-center p-0">

    {/* <div
      className="container"
      style={{ fontFamily: "Inter, sans-serif", height: "100vh", width: "450px" }}
    > */}
            <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{fontFamily: "Inter, sans-serif", maxWidth: '500px', margin: 'auto', width: '100%' }}>
            <div className="row g-2 w-100">

            <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
        <button className="pe-5" onClick={handlePageNavigation}><FaArrowLeft color="#30747F"/> 
      </button> <h3 className="m-0 ms-3" style={{fontSize:"15px"}}>DETAIL PROPERTY</h3> </div>

      {showShareOptions && (
        <div
          className="d-flex flex-column gap-2 mt-4 pt-3 p-3"
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



  <Swiper loop={true} navigation={true} modules={[Navigation]}     onSlideChange={handleSlideChange}
  >
{images.length > 0
    ? images.map((image, index) => (
        <SwiperSlide key={index}>
          <div
          onClick={() => handleImageClick(index)}
            className="d-flex justify-content-center align-items-center position-relative"
            style={{
              height: "200px",
              width: "100%",
              overflow: "hidden",
              borderRadius: "8px",
              margin: "auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              position: "relative",
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
      ))
    : // If no images, show default image with button
      [
        <SwiperSlide key="default">
          <div
            className="d-flex justify-content-center align-items-center position-relative"
            style={{
              height: "200px",
              width: "100%",
              overflow: "hidden",
              borderRadius: "8px",
              margin: "auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src="https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
              alt="Default Property Image"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
           
<button
  className="btn"
  style={{
    border:"none",
    position: "absolute",
    bottom: "10px",
    right: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    zIndex: 10,
    color:"#ffffff",
    background: photoRequested ? "#3F61D8" : "#34ACD6", // Green if already requested
  }}
  onClick={!photoRequested ? handlePhotoRequest : null} // Disable re-clicking
>
  {photoRequested ? "Photo Request Sent" : "Photo Request"}
</button>



          </div>
        

        </SwiperSlide>,
      ]}

      {/* Video Slide */}
      <SwiperSlide>
        <div
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
          <video controls style={{ height: "100%", width: "100%", objectFit: "cover" }}>
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl.replace(".mp4", ".webm")} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </SwiperSlide>
    </Swiper>
  <style>
    {`
      .swiper-button-next, .swiper-button-prev {
        color: white !important;
        font-size: 24px !important;
      }
    `}
  </style>

  <div className="text-center mt-2">
    {Math.min(currentIndex, images.length)}/{maxImages}
  </div>
</div>

        <p className="text-start m-0" style={{ color: "black" , fontSize:"18px" , paddingLeft:"10px"}}>
       <strong>{propertyDetails.propertyMode} |  {propertyDetails.propertyType}</strong>  
        </p>
         <h6
        className="p-2 mt-3 "
        style={{
          backgroundColor: "rgb(47,116,127)",
                    color: "white",
                    borderRadius: "5px",
                    width: "27%",
                    fontSize:'12px',
                    marginLeft:"10px"
        }}
      >
        PPC_ID : {propertyDetails.ppcId}
      </h6>
      <div className="d-flex justify-content-between align-items-center" style={{    paddingLeft:"10px",
    paddingRight:"10px"}}>
      <p className="m-0  " style={{
    color: "#4F4B7E",
    fontWeight: 'bold',
    fontSize: "16px",

  }}>
    <MdOutlineCurrencyRupee size={26} /> {formattedPrice}
    <span style={{ fontSize: '14px', color: "#30747F", marginLeft: "10px" }}>
       Negotiation: {propertyDetails.negotiation}
    </span>
  </p>

  {/* ({priceInWords})  */}

        <div className="d-flex gap-3 position-relative">
          <FaShareAlt
            style={{ cursor: "pointer", fontSize: "20px", color: "#30747F" }}
            // onClick={handleShareClick}
            onClick={toggleShareOptions}
             url={currentUrl}
             title="Share this page"
          />
  
          {isHeartClicked ? (
  <FaHeart 
    style={{ cursor: "pointer", fontSize: "20px", color: "red" }} 
    onClick={handleHeartClick} 
  />
) : (
  <FaRegHeart 
    style={{ cursor: "pointer", fontSize: "20px", color: "#30747F" }} 
    onClick={handleHeartClick} 
  />
)}
    {showOptions && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "10px",
            position: "absolute",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            top: "40px",
            right:"0px",
            zIndex: 999,
          }}
        >
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={currentUrl} >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton url={currentUrl} >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={currentUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      )}
     
        </div>
      </div>
      <p style={{paddingLeft:"10px", paddingRight:"10px"}}>({priceInWords})</p>

        <h4 className="fw-bold mt-0" style={{fontSize:"15px",paddingLeft:"10px"}}>Make an offer</h4>
            <form onSubmit={handleSubmit} className="d-flex">
               
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                     <FaRupeeSign style={{ position: 'absolute', left: '10px', color: '#30747F' }} />
                     <input 
                        type="number" 
                        className="w-75 me-2 m-0 ms-2" 
                        placeholder="Make an offer" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ padding: "8px 12px 8px 30px", borderRadius: "4px", border: "1px solid #30747F", marginRight: "10px", width: "100%" }} 
                    />
                    <button className="m-0"
                        type="submit" 
                        style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #30747F", backgroundColor: "#30747F", color: "#fff" }}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="container d-flex justify-content-center">

      <div className="row g-3 mt-0 w-100">

{propertyDetailsList.map((detail, index) => {
// Check if it's a heading, which should always be full-width (col-12)
if (detail.heading) {
  return (
    <div key={index} className="col-12">
      <h4
        className="m-0 fw-bold"
        style={{ color: "#000000", fontFamily: "Inter, sans-serif", fontSize: "16px" }}
      >
        {detail.label}
      </h4>
    </div>
  );
}

const isDescription = detail.label === "Description";

// const isDescription = typeof detail.value === "string" && detail.value.trim() === formData.description.trim();
// const columnClass = isDescription ? "col-12" : "col-6";
const columnClass = isDescription ? "col-12" : "col-6";

return (
  <div key={index} className={columnClass}>
    <div
      className="d-flex align-items-center border-0 rounded p-1 mb-1"
      style={{
        // backgroundColor: "#F9F9F9", // Background for the item
        width: "100%",
        height: isDescription ? "auto" : "55px",
        wordBreak: "break-word",
        // height: detail.label === "Description" || detail.value === formData.description ? "auto" : "100px", // Full height for description
      }}
    >
      <span className="me-3 fs-3" style={{ color: "#30747F" }}>
        {detail.icon} 
      </span>
      <div>
      {!isDescription && <span className="mb-1" style={{fontSize:"12px", color:"grey"}}>{detail.label || "N/A"}</span>}  {/* ✅ Hide label for description */}

      {/* <h6 className="mb-1">{isDescription ? "Description" : detail.label || "N/A"}</h6> */}
        <p
          className="mb-0 p-0"
          style={{
            fontSize:"14px",
            color:"grey",
            fontWeight:"600",
            padding: "10px",
            borderRadius: "5px",
            width: "100%", // Ensure the value takes full width
          }}
        >
          {detail.value || "N/A"} 
        </p>
      </div>
    </div>
  </div>
);
})}
{/* <div>
      <h5 className="pt-3 fw-bold"> Video </h5>
      <video width="100%" height="auto" controls>
        <source src="path_to_your_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div> */}

      {/* Contact Info Section */}
      <h5 className="pt-3 fw-bold">Contact Info</h5>
   

<div 
  className="btn rounded-1 p-2 text-center d-flex align-items-center justify-content-center" 
  style={{ background: 'transparent', border: '1px solid #30747F', color: '#30747F' }} 
  onClick={handleOwnerContactClick}
>
  <img 
    src={contact} 
    alt="Contact Icon" 
    style={{ width: '20px', height: '20px', marginRight: '8px' }} 
  />
  View owner contact details
</div>
      {showContactDetails && (
        <div className="mt-3">
          {/* <p style={{color:'red'}}><strong style={{color:'black'}}>Name:</strong> {propertyDetails.ownerName || "Not Available"}</p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>Phone Number:</strong> <a href={`tel:${propertyDetails.phoneNumber}`} style={{ color: "red", textDecoration: "none" }}>{propertyDetails.phoneNumber || "Not Available"}</a></p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>Alternate Number:</strong> {propertyDetails.phoneNumber || "Not Available"}</p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>email:</strong> {propertyDetails.email || "Not Available"}</p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>Address:</strong> {propertyDetails.city || "Not Available"}</p>
          <p style={{color:'red'}}><strong style={{color:'black'}}>Best Time to Call:</strong> {propertyDetails.bestTimeToCall || "Not Available"}</p>
        */}
   <div className="row g-3">

{/* Name */}
<div className="col-6 d-flex align-items-center">
  <FaUser style={{ fontSize: "16px", color: "#30747F", marginRight: "10px" }} />
  <div>
    <div style={{ fontSize: "13px", color: "grey" }}>Name</div>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "grey" }}>
      {propertyDetails.ownerName || "N/A"}
    </div>
  </div>
</div>

{/* Email */}
<div className="col-12 d-flex align-items-center">
  <FaEnvelope style={{ fontSize: "16px", color: "#30747F", marginRight: "10px" }} />
  <div>
    <div style={{ fontSize: "13px", color: "grey" }}>Email</div>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "grey" }}>
      {propertyDetails.email || "N/A"}
    </div>
  </div>
</div>

{/* Mobile */}
<div className="col-6 d-flex align-items-center">
  <FaPhoneAlt style={{ fontSize: "16px", color: "#30747F", marginRight: "10px" }} />
  <div>
    <div style={{ fontSize: "13px", color: "grey" }}>Mobile</div>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "grey" }}>
      {propertyDetails.phoneNumber || "N/A"}
    </div>
  </div>
</div>

{/* Alternate Phone */}
<div className="col-6 d-flex align-items-center">
  <FaPhoneAlt style={{ fontSize: "16px", color: "#30747F", marginRight: "10px" }} />
  <div>
    <div style={{ fontSize: "13px", color: "grey" }}>Alternate Phone</div>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "grey" }}>
      {/* {propertyDetails.alternatePhone || "N/A"} */}
         <a
                            href={`tel:${propertyDetails.alternatePhone}`}
                            style={{
                              textDecoration: "none",
                              color: "#2E7480",
                            }}
                          >
                            {propertyDetails.alternatePhone || "N/A"}
                            </a>
    </div>
  </div>
</div>

{/* Address */}
<div className="col-12 d-flex align-items-center">
  <FaMapMarkerAlt style={{ fontSize: "16px", color: "#30747F", marginRight: "10px" }} />
  <div>
    <div style={{ fontSize: "13px", color: "grey" }}>Address</div>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "grey" }}>
      {propertyDetails.rentalPropertyAddress || "N/A"}
    </div>
  </div>
</div>

{/* Best Time to Call */}
<div className="col-12 d-flex align-items-center">
  <FaClock style={{ fontSize: "16px", color: "#30747F", marginRight: "10px" }} />
  <div>
    <div style={{ fontSize: "13px", color: "grey" }}>Best Time to Call</div>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "grey" }}>
      {propertyDetails.bestTimeToCall || "N/A"}
    </div>
  </div>
</div>

</div>

          <span className="d-flex justify-content-end align-items-center">
  {/* <button
    className="btn btn-link p-0"
    style={{ color: "#30747F", textDecoration: "underline" }}
    onClick={toggleContactDetails}
  >
    Show less
  </button> */}

  <button
    className="btn btn-outline-#30747F m-0 d-flex align-items-center gap-2"
    style={{ color: "white",backgroundColor:" #30747F", border: "1px solid #30747F" }}
    onClick={() => (window.location.href = `tel:${propertyDetails.phoneNumber}`)}
  >
    <FaPhoneAlt /> Call
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

      {showPopup && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.4)", // Dark overlay
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        width: "300px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <p>{popupMessage}</p>
      <button
              className="btn text-white px-3 py-1 flex-grow-1 mx-1"

        onClick={() => {
          confirmAction();
          setShowPopup(false);
        }}
        style={{ background:  "#2F747F", width: "80px", fontSize: "13px" }}

      >
        Yes
      </button>
      <button
              className="btn text-white px-3 py-1 flex-grow-1 mx-1"

        onClick={() => setShowPopup(false)}
        style={{ background:  "#FF0000", width: "80px", fontSize: "13px" }}

      >
        No
      </button>
    </div>
  </div>
)}
{/* 
     {showPopup && (
  <div className="popup">
    <div className="popup-content">
      <p>{popupMessage}</p>
      <button onClick={() => { confirmAction(); setShowPopup(false); }}>Yes</button>
      <button onClick={() => setShowPopup(false)}>No</button>
    </div>
  </div>
)} */}


{message && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      width: "300px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
    }}
  >
    <p>{message}</p>
   
  </div>
)}


    </div>
    </div>

   <img src={promotion} alt="" className="p-4 m-0" />
    </div>
    </div>
    </div>

  );
};

export default Details;


