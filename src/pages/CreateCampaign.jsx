import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { CustomButton, FormField, Loader } from '../components';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({ title: '', description: '', target: '', deadline: '', image: '' });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title && form.description && form.target && form.deadline && form.image) {
      setIsLoading(true);
      await createCampaign({ ...form });
      setIsLoading(false);
      navigate('/');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="page-container">
      {isLoading && <Loader />}
      <h1 className="page-title">Start a Campaign</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <FormField labelName="Campaign Title *" placeholder="Write a title" inputType="text" value={form.title} handleChange={(e) => handleFormFieldChange('title', e)} />
        </div>
        <FormField labelName="Story *" placeholder="Write your story" isTextArea value={form.description} handleChange={(e) => handleFormFieldChange('description', e)} />
        <div className="form-row">
          <FormField labelName="Goal *" placeholder="ETH 0.50" inputType="text" value={form.target} handleChange={(e) => handleFormFieldChange('target', e)} />
          <FormField labelName="End Date *" placeholder="End Date" inputType="date" value={form.deadline} handleChange={(e) => handleFormFieldChange('deadline', e)} />
        </div>
        <FormField labelName="Campaign image *" placeholder="Place image URL of your campaign" inputType="url" value={form.image} handleChange={(e) => handleFormFieldChange('image', e)} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
          <CustomButton btnType="submit" title="Submit new campaign" styles={{ backgroundColor: 'var(--color-accent-primary)' }} />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
