
import React, { useState } from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';
import { RiRadioButtonFill } from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarCards = () => {
  // Static data for the cards
  const carData = [
    {
      id: 1,
      status: "Incomplete Car",
      featured: true,
      make: "Pondy",
      model: "Audi",
      fuel: "Petrol",
      transmission: "Automatic",
      color: "Red",
      owner: "1",
      year: "2019",
      insurance: "Comprehensive",
      bodyType: "Sedan",
      vehicleType: "Personal",
      postedBy: "Dealer",
      state: "Tamil Nadu",
      district: "Chennai",
      area: "Anna Nagar",
      city: "Chennai",
      price: "500000",
      km: "30000",
      pucId: "8333",
      mobileNo: "9876543210",
      image: "https://hips.hearstapps.com/hmg-prod/images/2-spectre-unveiled-the-first-fully-electric-rolls-royce-front-3-4-1666037303.jpg",
    },
    {
      id: 2,
      status: "Complete Car",
      featured: false,
      make: "Toyota",
      model: "Corolla",
      fuel: "Diesel",
      transmission: "Manual",
      color: "Blue",
      owner: "2",
      year: "2020",
      insurance: "Third Party",
      bodyType: "Hatchback",
      vehicleType: "Personal",
      postedBy: "Owner",
      state: "Karnataka",
      district: "Bangalore",
      area: "Koramangala",
      city: "Bangalore",
      price: "600000",
      km: "15000",
      pucId: "8334",
      mobileNo: "9876543211",
      image: "https://via.placeholder.com/500x300?text=Car+Image+2",
    },
    {
      id: 3,
      status: "Incomplete Car",
      featured: true,
      make: "Honda",
      model: "Civic",
      fuel: "Petrol",
      transmission: "Automatic",
      color: "Black",
      owner: "1",
      year: "2018",
      insurance: "Comprehensive",
      bodyType: "Sedan",
      vehicleType: "Personal",
      postedBy: "Dealer",
      state: "Delhi",
      district: "South Delhi",
      area: "Saket",
      city: "Delhi",
      price: "700000",
      km: "50000",
      pucId: "8335",
      mobileNo: "9876543212",
      image: "https://via.placeholder.com/500x300?text=Car+Image+3",
    },
    {
      id: 4,
      status: "Complete Car",
      featured: false,
      make: "BMW",
      model: "X5",
      fuel: "Diesel",
      transmission: "Automatic",
      color: "White",
      owner: "3",
      year: "2021",
      insurance: "Third Party",
      bodyType: "SUV",
      vehicleType: "Personal",
      postedBy: "Owner",
      state: "Maharashtra",
      district: "Mumbai",
      area: "Andheri",
      city: "Mumbai",
      price: "800000",
      km: "10000",
      pucId: "8336",
      mobileNo: "9876543213",
      image: "https://via.placeholder.com/500x300?text=Car+Image+4",
    },
  ];

  // State for filtering
  const [filters, setFilters] = useState({
    status: '',
    featured: '',
    make: '',
    model: '',
    fuel: '',
    transmission: '',
    color: '',
    owner: '',
    year: '',
    insurance: '',
    bodyType: '',
    vehicleType: '',
    postedBy: '',
    state: '',
    district: '',
    area: '',
    city: '',
    priceMin: '',
    priceMax: '',
    kmMin: '',
    kmMax: '',
    pucId: '',
    mobileNo: '',
  });

  const [filteredCars, setFilteredCars] = useState(carData);

  // Handle form input change and filter cars immediately
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };

      // Filter cars based on updated filters
      const filtered = carData.filter((car) => {
        return (
          (!newFilters.status || car.status.toLowerCase().includes(newFilters.status.toLowerCase())) &&
          (!newFilters.make || car.make.toLowerCase().includes(newFilters.make.toLowerCase())) &&
          (!newFilters.model || car.model.toLowerCase().includes(newFilters.model.toLowerCase())) &&
          (!newFilters.fuel || car.fuel.toLowerCase().includes(newFilters.fuel.toLowerCase())) &&
          (!newFilters.transmission || car.transmission.toLowerCase().includes(newFilters.transmission.toLowerCase())) &&
          (!newFilters.color || car.color.toLowerCase().includes(newFilters.color.toLowerCase())) &&
          (!newFilters.owner || car.owner === newFilters.owner) &&
          (!newFilters.year || car.year === newFilters.year) &&
          (!newFilters.insurance || car.insurance.toLowerCase().includes(newFilters.insurance.toLowerCase())) &&
          (!newFilters.bodyType || car.bodyType.toLowerCase().includes(newFilters.bodyType.toLowerCase())) &&
          (!newFilters.vehicleType || car.vehicleType.toLowerCase().includes(newFilters.vehicleType.toLowerCase())) &&
          (!newFilters.postedBy || car.postedBy.toLowerCase().includes(newFilters.postedBy.toLowerCase())) &&
          (!newFilters.state || car.state.toLowerCase().includes(newFilters.state.toLowerCase())) &&
          (!newFilters.district || car.district.toLowerCase().includes(newFilters.district.toLowerCase())) &&
          (!newFilters.area || car.area.toLowerCase().includes(newFilters.area.toLowerCase())) &&
          (!newFilters.city || car.city.toLowerCase().includes(newFilters.city.toLowerCase())) &&
          (!newFilters.priceMin || parseInt(car.price) >= parseInt(newFilters.priceMin)) &&
          (!newFilters.priceMax || (parseInt(car.price) <= parseInt(newFilters.priceMax) && newFilters.priceMax !== '')) &&
          (!newFilters.kmMin || parseInt(car.km) >= parseInt(newFilters.kmMin)) &&
          (!newFilters.kmMax || (parseInt(car.km) <= parseInt(newFilters.kmMax) && newFilters.kmMax !== '')) &&
          (!newFilters.pucId || car.pucId.toLowerCase().includes(newFilters.pucId.toLowerCase())) &&
          (!newFilters.mobileNo || car.mobileNo.toLowerCase().includes(newFilters.mobileNo.toLowerCase()))
        );
      });

      setFilteredCars(filtered);
      return newFilters;
    });
  };

  return (
    <div className="container">
      <h3>Filter Cars</h3>

      {/* Form for filtering */}
      <div className="mb-4">
        {/* <form>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="status"
                placeholder="Car Status"
                value={filters.status}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="make"
                placeholder="Car Make"
                value={filters.make}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="model"
                placeholder="Car Model"
                value={filters.model}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="fuel"
                placeholder="Fuel Type"
                value={filters.fuel}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="transmission"
                placeholder="Transmission"
                value={filters.transmission}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="color"
                placeholder="Reg Color"
                value={filters.color}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="owner"
                placeholder="Reg Owner"
                value={filters.owner}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                name="year"
                placeholder="Reg Year"
                value={filters.year}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="insurance"
                placeholder="Insurance Type"
                value={filters.insurance}
                onChange={handleFilterChange}
              />
            </div>
          </div>

        </form> */}

<form>
      <div className="container">
        <div className="row">
          {/* Car Status */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="carStatus"
              placeholder="Car Status"
              value={filters.carStatus}
              onChange={handleFilterChange}
            />
          </div>

          {/* Select Featured */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="featured"
              placeholder="Select Featured"
              value={filters.featured}
              onChange={handleFilterChange}
            />
          </div>

          {/* Car Make */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="make"
              placeholder="Car Make"
              value={filters.make}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Car Model */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="model"
              placeholder="Car Model"
              value={filters.model}
              onChange={handleFilterChange}
            />
          </div>

          {/* Fuel Type */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="fuelType"
              placeholder="Fuel Type"
              value={filters.fuelType}
              onChange={handleFilterChange}
            />
          </div>

          {/* Registration State */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="regState"
              placeholder="Registration State"
              value={filters.regState}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Transmission */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="transmission"
              placeholder="Transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
            />
          </div>

          {/* Registration Color */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="regColor"
              placeholder="Registration Color"
              value={filters.regColor}
              onChange={handleFilterChange}
            />
          </div>

          {/* Registration Owner */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="regOwner"
              placeholder="Registration Owner"
              value={filters.regOwner}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Registration Year */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="regYear"
              placeholder="Registration Year"
              value={filters.regYear}
              onChange={handleFilterChange}
            />
          </div>

          {/* Insurance Type */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="insuranceType"
              placeholder="Insurance Type"
              value={filters.insuranceType}
              onChange={handleFilterChange}
            />
          </div>

          {/* Body Type */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="bodyType"
              placeholder="Body Type"
              value={filters.bodyType}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Vehicle Type */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="vehicleType"
              placeholder="Vehicle Type"
              value={filters.vehicleType}
              onChange={handleFilterChange}
            />
          </div>

          {/* Posted By */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="postedBy"
              placeholder="Posted By"
              value={filters.postedBy}
              onChange={handleFilterChange}
            />
          </div>

          {/* State */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="state"
              placeholder="State"
              value={filters.state}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="row">
          {/* District */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="district"
              placeholder="District"
              value={filters.district}
              onChange={handleFilterChange}
            />
          </div>

          {/* Area */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="area"
              placeholder="Area"
              value={filters.area}
              onChange={handleFilterChange}
            />
          </div>

          {/* City */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Price Min */}
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              name="priceMin"
              placeholder="Price Min"
              value={filters.priceMin}
              onChange={handleFilterChange}
            />
          </div>

          {/* Price Max */}
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              name="priceMax"
              placeholder="Price Max"
              value={filters.priceMax}
              onChange={handleFilterChange}
            />
          </div>

          {/* Km Min */}
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              name="kmMin"
              placeholder="Km Min"
              value={filters.kmMin}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Km Max */}
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              name="kmMax"
              placeholder="Km Max"
              value={filters.kmMax}
              onChange={handleFilterChange}
            />
          </div>

          {/* PUC ID */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="pucId"
              placeholder="PUC ID"
              value={filters.pucId}
              onChange={handleFilterChange}
            />
          </div>

          {/* Mobile No */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="mobileNo"
              placeholder="Mobile No"
              value={filters.mobileNo}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </form>
      </div>

      <h4>Available Cars</h4>
      <div className="row">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} className="col-md-4 mb-4">
              {/* <div
                className="card"
                style={{
                  backgroundImage: `url(${car.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',
                  color: 'white',
                  position: 'relative',
                }}
              >
                <div
                  className="card-body"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: 'rgba(0, 0, 0, 0.4)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '15px',
                  }}
                >
                  <h5 className="card-title">{car.make} {car.model}</h5>
                  <p className="card-text">Price: ₹{car.price}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <FaEye size={18} /> View
                    </div>
                    <div>
                      <FaEdit size={18} /> Edit
                    </div>
                  </div>
                </div>
              </div> */}
 <div
  className="card"
  style={{
    backgroundImage: `url(${car.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
    color: 'white',
    borderRadius: '10px',
    position: 'relative',
  }}
>
  {/* Overlay to darken the background image and ensure text visibility */}
  <div
    className="card-body d-flex flex-column justify-content-between"
    style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.4)', // Darken the background
      borderRadius: '10px',
      color: 'white',
      padding: '15px',
    }}
  >
    {/* Status text and icon at the top */}
    <div className="d-flex justify-content-between align-items-center">
      <p className="card-text" style={{ margin: '0' }}>
        <strong>Status:</strong> {car.status}
      </p>
      <RiRadioButtonFill size={20} style={{ color: 'green' }} />
    </div>

    <h5 className="card-title">{car.make} {car.model}</h5>
    <p className="card-text">
      <strong>Price:</strong> ₹{car.price}
    </p>
    <p className="card-text">
      <strong>Km:</strong> {car.km} Km
    </p>

    {/* Card footer with action icons */}
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <FaEye size={20} style={{ marginRight: '10px', cursor: 'pointer' }} />
        <FaEdit size={20} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  </div>
</div>

            </div>
          ))
        ) : (
          <p>No cars match the filters</p>
        )}
      </div>
    </div>
  );
};

export default CarCards;
