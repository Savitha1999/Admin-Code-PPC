






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BuyerPlan.css';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const BuyerForm = ({ plan, onSave }) => {
  const [formData, setFormData] = useState({
    planName: '',
    planAmount: '',
    planValidity: '',
    numberOfAssistants: '',
    serviceType: '',
    status: 'active',
  });

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (plan) {
        await axios.put(`${process.env.REACT_APP_API_URL}/buyer-update-plans/${plan._id}`, formData);
        toast.success('Buyer Plan updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/buyer-plan-create`, formData);
        toast.success('Buyer Plan created successfully!');
      }
      onSave();
    } catch (error) {
      toast.error('Failed to save plan!');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className='text-center mb-4'>
        {plan ? 'Update Plan' : 'Create Plan'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Plan Name:</label>
            <input
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Plan Amount:</label>
            <input
              type="text"
              name="planAmount"
              value={formData.planAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Plan Validity:</label>
            <input
              type="text"
              name="planValidity"
              value={formData.planValidity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Number of Assistants:</label>
            <input
              type="text"
              name="numberOfAssistants"
              value={formData.numberOfAssistants}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row w-50">
          <div className="form-group">
            <label>Service Type:</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className='w-25' type="submit">
          {plan ? 'Update Plan' : 'Create Plan'}
        </button>
      </form>
    </div>
  );
};



const BuyerList = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-plans-all`);
      setPlans(response.data);
    } catch (error) {
      toast.error('Failed to fetch plans!');
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this plan?')) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/buyer-plans/${id}`);
        toast.success('Plan deleted successfully!');
        fetchPlans();
      }
    } catch (error) {
      toast.error('Failed to delete plan!');
    }
  };

  const handleSave = () => {
    setSelectedPlan(null);
    fetchPlans();
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'hide' : 'active';
      await axios.put(`${process.env.REACT_APP_API_URL}/buyer-plans/${id}/status`, { status: newStatus });
      toast.success(`Plan ${newStatus === 'active' ? 'activated' : 'hidden'} successfully!`);
      fetchPlans();
    } catch (error) {
      toast.error('Failed to update plan status!');
    }
  };

  return (
    <div>
      <BuyerForm plan={selectedPlan} onSave={handleSave} />
      <h3>Plan Details</h3>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Plan Name</th>
            <th>Amount</th>
            <th>Validity</th>
            <th>Number of Assistants</th>
            {/* <th>Service Type</th> */}
            <th>Status</th>
            <th>Change Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={plan._id}>
              <td>{index + 1}</td>
              <td>{plan.planName}</td>
              <td>{plan.planAmount}</td>
              <td>{plan.planValidity}</td>
              <td>{plan.numberOfAssistants}</td>
              {/* <td>{plan.serviceType}</td> */}
              <td>{plan.status}</td>
              <td>
              <button className='toggle ms-1 bg-success' onClick={() => toggleStatus(plan._id, plan.status)}>
                  {plan.status === 'active' ? 'Hide' : 'Activate'}
                </button>
              </td>
              <td>      
                <button className='text-primary' onClick={() => setSelectedPlan(plan)}><FaEdit /></button>
                <button className='text-danger fs-5' onClick={() => handleDelete(plan._id)}><MdDeleteForever /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerList;

