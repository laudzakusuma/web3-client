import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { CustomButton, FormField, Loader } from '../components';
import toast from 'react-hot-toast';

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

    // Validasi 1: Cek apakah semua kolom terisi
    if (!form.title || !form.description || !form.target || !form.deadline || !form.image) {
      return toast.error('Please fill all the required fields.');
    }

    // Validasi 2: Cek apakah target adalah angka yang valid
    if (isNaN(form.target) || parseFloat(form.target) <= 0) {
      return toast.error('Please enter a valid goal amount greater than 0.');
    }

    // Validasi 3: Cek apakah tanggal deadline berada di masa depan
    if (new Date(form.deadline).getTime() <= Date.now()) {
      return toast.error('The end date must be in the future.');
    }

    // Jika semua validasi lolos, lanjutkan proses
    setIsLoading(true);
    await createCampaign({ ...form });
    setIsLoading(false);
    toast.success('Campaign created successfully!');
    navigate('/');
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