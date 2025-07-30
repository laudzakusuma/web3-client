import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton, FormField } from '../components';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.title && form.description && form.target && form.deadline && form.image) {
      setIsLoading(true);
      await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
      setIsLoading(false);
      navigate('/');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div style={{ backgroundColor: '#1c1c24', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', padding: '1rem' }}>
      {isLoading && <div>Loading...</div>}
      <h1 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 'bold', fontSize: '18px' }}>Start a Campaign</h1>
      
      <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
        />
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <FormField
                labelName="Goal *"
                placeholder="ETH 0.50"
                inputType="text"
                value={form.target}
                handleChange={(e) => handleFormFieldChange('target', e)}
            />
            <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => handleFormFieldChange('deadline', e)}
            />
        </div>

        <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
            <CustomButton
                btnType="submit"
                title="Submit new campaign"
                styles={{ backgroundColor: '#1dc071' }}
            />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;