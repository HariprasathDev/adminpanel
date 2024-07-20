// src/pages/EditProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/EditProfilePage.css';
import MatchingStars from './PartnerPreference/MatchingStars';

const EditProfilePage: React.FC = () => {
  const { ContentId } = useParams<{ ContentId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshData = location.state?.refreshData;
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const desiredFields = [
    'ProfileId',
    // 'Gender',
    'Mobile_no',
    'EmailId',
    'Profile_marital_status',
    'Profile_dob',
    'Profile_complexion',
    'Profile_address',
    'Profile_country',
    // 'Profile_state',
    // 'Profile_city',
    'Profile_pincode',
  ];



  const storedBirthStar = 25;
  console.log(storedBirthStar);
  const storedGender = 'female';

  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<
    string[]
  >([]);
  const handleCheckboxChange = (updatedIds: string[]) => {
    setSelectedStarIds(updatedIds);
  };

  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatusOption[]>([]);
  const [matchStars, setMatchStars] = useState<MatchingStar[][]>([]);
  const [selectedStarIds, setSelectedStarIds] = useState<string[]>([]);

  useEffect(() => {
    if (!ContentId) {
      console.error('ContentId is undefined');
      setError('ContentId is undefined');
      setLoading(false);
      return;
    }

    console.log('Fetching profile for ContentId:', ContentId);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/logindetails/${ContentId}/`);
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [ContentId]);

  useEffect(() => {
    if (storedBirthStar && storedGender) {
      const fetchMatchingStars = async () => {
        try {
          const response = await axios.post(
            `http://103.214.132.20:8000/auth/Get_Matchstr_Pref/`,
            {
              birth_star_id: storedBirthStar,
              gender: storedGender,
            },
          );

          const matchCountArrays: MatchingStar[][] = Object.values(
            response.data,
          ).map((matchCount: any) => matchCount);
          setMatchStars(matchCountArrays);
          console.log('Response from server:', matchCountArrays);
        } catch (error) {
          console.error('Error fetching matching star options:', error);
        }
      };
      fetchMatchingStars();
    }
  }, [storedBirthStar, storedGender]);
  console.log(matchStars);

  useEffect(() => {
    if (storedBirthStar && storedGender) {
      const fetchMatchingStars = async () => {
        try {
          const response = await axios.post(
            `http://103.214.132.20:8000/auth/Get_Matchstr_Pref/`,
            {
              birth_star_id: storedBirthStar,
              gender: storedGender,
            },
          );

          const matchCountArrays: MatchingStar[][] = Object.values(
            response.data,
          ).map((matchCount: any) => matchCount);
          setMatchStars(matchCountArrays);
          console.log('Response from server:', matchCountArrays);
        } catch (error) {
          console.error('Error fetching matching star options:', error);
        }
      };
      fetchMatchingStars();
    }
  }, [storedBirthStar, storedGender]);
  console.log(matchStars);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/logindetails/${ContentId}/`, profile);
      if (refreshData) {
        refreshData();
      }
      navigate('/admin');
    } catch (error) {
      setError('Error saving profile data');
    }
  };

  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        const response = await axios.post<{
          [key: string]: MaritalStatusOption;
        }>('http://103.214.132.20:8000/auth/Get_Marital_Status/');
        const options = Object.values(response.data);
        setMaritalStatuses(options);
      } catch (error) {
        console.error('Error fetching marital statuses:', error);
      }
    };

    fetchMaritalStatuses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // const [isBasicDetailsOpen, setIsBasicDetailsOpen] = useState(true);

  // const toggleSection1 = () => {
  //   setIsBasicDetailsOpen(!isBasicDetailsOpen);

  // }

  return (

    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <div className="form-container">





        <div className="form-group" key="ProfileId">
          <label htmlFor="ProfileId" className="block text-black font-medium mb-1">ProfileId</label>
          <input
            id="ProfileId"
            name="ProfileId"
            type="text"
            value={profile.ProfileId || ''}
            readOnly
          />
        </div>

        <div className="form-group" >
          <label htmlFor="" className="block  text-black font-medium mb-1">Profile Status</label>
          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >Approved</option>
            <option value="" >Pending</option>
            <option value="" >Hide</option>
            <option value="" >Delete</option>

          </select>
        </div>
        <div className="form-group" key="">
          <label htmlFor="EmailId" className="block text-black font-medium mb-1">Registration Date</label>
          <input
          // id="EmailId"
          // name="EmailId"
          // type="text"
          // value={profile.EmailId || ''}
          // onChange={handleChange}
          />
        </div>
        <div className="form-group" key="">
          <label htmlFor="EmailId" className="block text-black font-medium mb-1">Surya Gothram</label>
          <input
          // id="EmailId"
          // name="EmailId"
          // type="text"
          // value={profile.EmailId || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="" className="block  text-black font-medium mb-1">Mobile Number  Verification :</label>

          <input className="px-4" type="radio" value="Male" />
          <label className="text-black px-4" htmlFor="gender" >Yes</label>

          <input className="px-4" type="radio" value="Female" />
          <label className="text-black px-4" htmlFor="gender" >No</label>

        </div>

        <div className="form-group">
          <label htmlFor="state-options" className="block text-black font-medium mb-1">E-Mail Alart</label>
          <div id="state-options" className="flex flex-col">
            <label>
              <input type="checkbox" name="" value="Matching Profile Alart " /> Matching Profile Alart
            </label>
            <label>
              <input type="checkbox" name="" value="Recentily Update Profile  Visitor Alart" /> Recentily Update Profile
            </label>
            <label>
              <input type="checkbox" name="" value="Profile  Visitor Alart" /> Profile  Visitor Alart
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="state-options" className="block text-black font-medium mb-1">E-Mail Alart</label>
          <div id="state-options" className="flex flex-col">
            <label>
              <input type="checkbox" name="" value="Express Interest Alart  " /> Express Interest Alart
            </label>
            <label>
              <input type="checkbox" name="" value="Offers And Event " /> Offers And Event
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="state-options" className="block text-black font-medium mb-1">SMS Alart </label>
          <div id="state-options" className="flex flex-col">
            <label>
              <input type="checkbox" name="" value="Matching Profile Alart    " /> Matching Profile Alart
            </label>
            <label>
              <input type="checkbox" name="" value="Offers And Event  " /> Offers And Event
            </label>
          </div>
        </div>


        <div className="form-group">
          <label htmlFor="state-options" className="block text-black font-medium mb-1">Location </label>
          <div id="state-options" className="flex flex-col">
            <label>
              <input type="checkbox" name="" value="Tamil Nadu +pondicherry" /> Tamil Nadu +pondicherry
            </label>
            <label>
              <input type="checkbox" name="" value="Andera + Telangana  " /> Andera + Telangana
            </label>
            <label>
              <input type="checkbox" name="" value=" Karnataka " /> Karnataka
            </label>

            <label>
              <input type="checkbox" name="" value=" Others " /> Others
            </label>
          </div>
        </div>


        <div className="form-group">
          <label htmlFor="" className="block text-black font-medium mb-1">Exp Int No:</label>

          <input className="" type="radio" value="Yes" />
          <label className="text-black px-4" htmlFor="Yes" >Yes</label>

          <input className="px-4" type="radio" value="No" />
          <label className="text-black px-4" htmlFor="No" >No</label>

        </div>

        <div className="form-group">
          <label className="block text-black font-medium mb-1">Exp Int No.:</label>
          <input type="text" name="exp_int_no" onChange={handleChange} />
        </div>


        <div className="form-group">
          <label className="block text-black font-medium mb-1" >URL No.:</label>
          <input type="text" name="url_no" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="block text-black font-medium mb-1">VC No.:</label>
          <input type="text" name="vc_no" onChange={handleChange} />
        </div>


        <div className="form-group">
          <label className="block text-black font-medium mb-1">Priority Circulation:</label>
          <input type="text" name="priority_circulation_from" placeholder="From" onChange={handleChange} />
          <input type="text" name="priority_circulation_to" placeholder="To" onChange={handleChange} />
        </div>


        <div className="form-group">
          <label className="block text-black font-medium mb-1">Mini Pack No.:</label>
          <input type="text" name="mini_pack_no" placeholder="0" onChange={handleChange} />
          <input type="text" name="mini_pack_from" placeholder="From" onChange={handleChange} />
          <input type="text" name="mini_pack_to" placeholder="To" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="block text-black font-medium mb-1">Membership Date:</label>
          <div className="form-group">
            <input type="text" name="membership_date_from" placeholder="From" onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="text" name="membership_date_to" placeholder="To" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="block text-black font-medium mb-1">Add Ons:</label>
          <div>
            <input type="checkbox" name="featured_profile" onChange={handleChange} /> Featured Profile
            <input type="checkbox" name="featured_profile_offer" onChange={handleChange} /> Offer
          </div>
          <div>
            <input type="checkbox" name="priority_circulation_addon" onChange={handleChange} /> Priority Circulation
            <input type="checkbox" name="priority_circulation_offer" onChange={handleChange} /> Offer
          </div>
          <div>
            <input type="checkbox" name="email_blast" onChange={handleChange} /> E-Mail Blast
            <input type="checkbox" name="email_blast_offer" onChange={handleChange} /> Offer
          </div>
          <div>
            <input type="checkbox" name="astro_service" onChange={handleChange} /> Astro Service
            <input type="checkbox" name="astro_service_offer" onChange={handleChange} /> Offer
          </div>
        </div>



        <div className="form-group" key="Mobile_no">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Mobile Number</label>
          <input
            id="Mobile_no"
            name="Mobile_no"
            type="text"
            value={profile.Mobile_no || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Mobile_no">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Whatsapp Number</label>
          <input
            id="Mobile_no"
            name="Mobile_no"
            type="text"
            value={profile.Mobile_no || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Mobile_no">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Alternating Mobile Number</label>
          <input
            id="Mobile_no"
            name="Mobile_no"
            type="text"
            value={profile.Mobile_no || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="EmailId">
          <label htmlFor="EmailId" className="block text-black font-medium mb-1">EmailId</label>
          <input
            id="EmailId"
            name="EmailId"
            type="text"
            value={profile.EmailId || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Password</label>
          <input
            id=""
            name=""
            type="password"
            // value={profile.Mobile_no || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_marital_status">
          <label htmlFor="Profile_marital_status" className="block text-black font-medium mb-1">Profile Marital Status</label>
          <input
            id="Profile_marital_status"
            name="Profile_marital_status"
            type="text"
            value={profile.Profile_marital_status || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_dob">
          <label htmlFor="Profile_dob" className="block text-black font-medium mb-1">Date of Birth</label>
          <input
            id="Profile_dob"
            name="Profile_dob"
            type={"date"}
            value={profile.Profile_dob || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Profile_address" className="block text-black font-medium mb-1">Address</label>
          <input
            id="Profile_address"
            name="Profile_address"
            type="text"
            value={profile.Profile_address || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_pincode">
          <label htmlFor="Profile_pincode" className="block text-black font-medium mb-1,">pincode</label>
          <input
            id="Profile_pincode"
            name="Profile_pincode"
            type="text"
            value={profile.Profile_pincode || ''}
            onChange={handleChange}
          />
        </div>


        <div className="flex w-full flex-row gap-4">

          <div className="flex w-full flex-row gap-4">
            <div className="w-full ">
              <label htmlFor="" className="block  text-black font-medium mb-1"> complexion</label>
              <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
                <option value="">Select your complexion</option>
                <option value="1">Brown</option>
                <option value="2">White</option>
                <option value="3">Dark</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="Profile_country" className="block text-black font-medium mb-1">Country</label>
              <select
                id="Profile_country"
                name="Profile_country"
                className="outline-none w-full px-4 py-2 border border-black rounded"
                value={profile.Profile_country || ''}
                onChange={handleChange}
              >
                <option value="" disabled>Select your country</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

          </div>
        </div>


        <div className="flex w-full flex-row gap-4">

          <div className="w-full ">
            <label htmlFor="" className="block  text-black font-medium mb-1">City</label>
            <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
              <option value="" >option 1</option>
              <option value="" >option 2</option>
              <option value="" >option 3</option>

            </select>
          </div>


          <div className="w-full ">
            <label htmlFor="" className="block  text-black font-medium mb-1">State</label>
            <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
              <option value="" >option 1</option>
              <option value="" >option 2</option>
              <option value="" >option 3</option>

            </select>
          </div>



        </div>
        <div className="w-2/4 py-1">
          <label htmlFor="" className="block text-black font-medium mb-1,">Select Gender</label>

          <input className="" type="radio" value="Male" />
          <label className="text-black px-4" htmlFor="gender" >Male</label>

          <input className="px-4" type="radio" value="Female" />
          <label className="text-black px-4" htmlFor="gender" >Female</label>

        </div>


      </div>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Family Details</h4>
      <div className="form-container">
        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Father Name </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="" className="block  text-black font-medium mb-1">Father Occupation</label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Mother Name </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="block  text-black font-medium mb-1">Mother Occupation</label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Family name</label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">About Myself</label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Mother Name </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">My Hobbies</label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Blood Group</label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Property Details</label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="" className="block  text-black font-medium mb-1">Physically Challenged          </label>

          <input className="px-4" type="radio" value="Male" />
          <label className="text-black px-4" htmlFor="gender" >Yes</label>

          <input className="px-4" type="radio" value="Female" />
          <label className="text-black px-4" htmlFor="gender" >No</label>

        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Property Worth          </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Suya Gothram          </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Ancestor Origin          </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Ancestor Origin          </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">Uncle Gothram          </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="" className="block text-black font-medium mb-1">About my Family          </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

      </div>


      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Education Details</h4>


      <div className="form-container">
        <div className="flex w-full flex-row gap-4">
          <div className="w-full ">
            <label htmlFor="" className="block text-black font-medium mb-1">Highest Education Level *</label>

            <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
              <option value="" >option 1</option>
              <option value="" >option 2</option>
              <option value="" >option 3</option>

            </select>
          </div>
          <div className="w-full ">
            <label htmlFor="" className="block text-black font-medium mb-1">UG Degree (Only if masters selected in highest education)</label>

            <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
              <option value="" >option 1</option>
              <option value="" >option 2</option>
              <option value="" >option 3</option>

            </select>
          </div>



        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">About Your Education </label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="" className="block text-black font-medium mb-1">Annual Income</label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Actual Income</label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>


      </div>


      <h4 className="text-xl font-semibold text-black dark:text-white">Work Location</h4>
      <div className="form-container">
        <div className="flex w-full flex-row gap-4">
          <div className="w-full ">
            <label htmlFor="" className="block text-black font-medium mb-1">Country *</label>

            <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
              <option value="" >option 1</option>
              <option value="" >option 2</option>
              <option value="" >option 3</option>

            </select>
          </div>
          <div className="w-full ">
            <label htmlFor="" className="block text-black font-medium mb-1">State * (Based on country selection)</label>

            <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
              <option value="" >option 1</option>
              <option value="" >option 2</option>
              <option value="" >option 3</option>

            </select>
          </div>
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Pincode (Based on Country Selection)</label>
          <input
          // id="Mobile_no"
          // name="Mobile_no"
          // type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="block  text-black font-medium mb-1">Career Plans / Notes</label>
          <textarea className="outline-none w-full px-4 py-2 border border-black rounded" placeholder="Enter your message here..."></textarea>
        </div>




      </div>

      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Horoscope Details</h4>
      <div className="form-container">


        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Time of Birth</label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="time"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Place of Birth </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Birth Star          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Rasi </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>


        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">lagnam / Didi          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>


        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Chevvai Dhosam          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Sarpa Dhosham          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Naalikai</label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>


        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Dasa Name          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Dasa Balance          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Horoscope Hints          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>





      </div>

      <div className="form-container">
        <h4 className="text-xl font-semibold text-black dark:text-white ">
          Partner Preference
        </h4>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Select your Marital Status          </label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Height From </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>



        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Height To </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">State * (Based on country selection)</label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>
        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Age Preference          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Height Preference          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Chevvai</label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Rehu / Ketu          </label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Foreign Interest          </label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="w-full">
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Profession
            </h5>
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="employed"
                  name="pref_profession"
                  value="employed"
                />
                <label htmlFor="employed" className="pl-1">
                  Employed
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="business"
                  name="pref_profession"
                  value="business"
                />
                <label htmlFor="business" className="pl-1">
                  Business
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="student"
                  name="pref_profession"
                  value="student"
                />
                <label htmlFor="student" className="pl-1">
                  Student
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="notWorking"
                  name="pref_profession"
                  value="notWorking"
                />
                <label htmlFor="notWorking" className="pl-1">
                  Not Working
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="notMentioned"
                  name="pref_profession"
                  value="notMentioned"
                />
                <label htmlFor="notMentioned" className="pl-1">
                  Not Mentioned
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-[18px] text-black font-semibold mb-2">
            Marital Status
          </h5>
          <div className="flex justify-between items-center">
            {maritalStatuses.map((status) => (
              <div key={status.marital_sts_id}>
                <input
                  type="checkbox"
                  id={`maritalStatus-${status.marital_sts_id}`}
                  value={status.marital_sts_id.toString()}
                  checked={selectedMaritalStatuses.includes(
                    status.marital_sts_id.toString(),
                  )}
                  onChange={(e) =>
                    handleMaritalStatusChange(
                      status.marital_sts_id.toString(),
                      e.target.checked,
                    )
                  }
                />
                <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
                  {status.marital_sts_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[18px] text-primary font-semibold mb-2">Annual Income Preference</h5>
          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="No income"
                name="pref_anual_income"
                value="No income"
              />
              <label htmlFor="No income" className="pl-1">No income</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Under 50000"
                name="pref_anual_income"
                value="Under 50000"
              />
              <label htmlFor="Under 50000" className="pl-1">Under 50000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 50,001 - 1,00,000"
                name="pref_anual_income"
                value="Rs 50,001 - 1,00,000"
              />
              <label htmlFor="Rs 50,001 - 1,00,000" className="pl-1">Rs 50,001 - 1,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 100,001 - 2,00,000"
                name="pref_anual_income"
                value="Rs 100,001 - 2,00,000"
              />
              <label htmlFor="Rs 100,001 - 2,00,000" className="pl-1">Rs 100,001 - 2,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 3,00,001 - 4,00,000"
                name="pref_anual_income"
                value="Rs 3,00,001 - 4,00,000"
              />
              <label htmlFor="Rs 3,00,001 - 4,00,000" className="pl-1">Rs 3,00,001 - 4,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 4,00,001 - 5,00,000"
                name="pref_anual_income"
                value="Rs 4,00,001 - 5,00,000"
              />
              <label htmlFor="Rs 4,00,001 - 5,00,000" className="pl-1">Rs 4,00,001 - 5,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 5,00,001 - 75,00,000"
                name="pref_anual_income"
                value="Rs 5,00,001 - 75,00,000"
              />
              <label htmlFor="Rs 5,00,001 - 75,00,000" className="pl-1">Rs 5,00,001 - 75,00,000</label>
            </div>
          </div>
        </div>



        <div>
          <div className="justify-start items-center gap-x-5 text-black">
            {matchStars
              .sort((a, b) => b[0].match_count - a[0].match_count)
              .map((matchCountArray, index) => {
                const starAndRasi = matchCountArray.map((star) => ({
                  id: star.id.toString(),
                  star: star.matching_starname,
                  rasi: star.matching_rasiname,
                }));

                const matchCountValue = matchCountArray[0].match_count;

                return (
                  <MatchingStars
                    key={index}
                    initialPoruthas={`No of porutham ${matchCountValue}`}
                    starAndRasi={starAndRasi}
                    selectedStarIds={selectedStarIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                );
              })}
          </div>
        </div>

        {/* <div>
          <div className="justify-start items-center gap-x-5 text-black">
            {matchStars
              .sort((a, b) => b[0].match_count - a[0].match_count)
              .map((matchCountArray, index) => {
                const starAndRasi = matchCountArray.map((star) => ({
                  id: star.id.toString(),
                  star: star.matching_starname,
                  rasi: star.matching_rasiname,
                }));

                const matchCountValue = matchCountArray[0].match_count;

                return (
                  <MatchingStars
                    key={index}
                    initialPoruthas={`No of porutham ${matchCountValue}`}
                    starAndRasi={starAndRasi}
                    selectedStarIds={selectedStarIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                );
              })}
          </div>
        </div> */}


      </div>



      <div className="form-container">
        <h4 className="text-xl font-semibold text-black dark:text-white ">
          Partner Preference
        </h4>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Select your Marital Status          </label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Height From </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>



        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Height To </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">State * (Based on country selection)</label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>
        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Age Preference          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="form-group" key="Profile_address">
          <label htmlFor="Mobile_no" className="block text-black font-medium mb-1">Height Preference          </label>
          <input
            // id="Mobile_no"
            // name="Mobile_no"
            type="text"
          // value={profile.Mobile_no || ''}
          // onChange={handleChange}
          />
        </div>

        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Chevvai</label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Rehu / Ketu          </label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="w-full ">
          <label htmlFor="" className="block text-black font-medium mb-1">Foreign Interest          </label>

          <select className="outline-none w-full px-4 py-2 border border-black rounded" name="matrimonyProfile">
            <option value="" >option 1</option>
            <option value="" >option 2</option>
            <option value="" >option 3</option>

          </select>
        </div>


        <div className="w-full">
          <div>
            <h5 className="text-[18px] text-primary font-semibold mb-2">
              Profession
            </h5>
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="employed"
                  name="pref_profession"
                  value="employed"
                />
                <label htmlFor="employed" className="pl-1">
                  Employed
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="business"
                  name="pref_profession"
                  value="business"
                />
                <label htmlFor="business" className="pl-1">
                  Business
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="student"
                  name="pref_profession"
                  value="student"
                />
                <label htmlFor="student" className="pl-1">
                  Student
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="notWorking"
                  name="pref_profession"
                  value="notWorking"
                />
                <label htmlFor="notWorking" className="pl-1">
                  Not Working
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="notMentioned"
                  name="pref_profession"
                  value="notMentioned"
                />
                <label htmlFor="notMentioned" className="pl-1">
                  Not Mentioned
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-[18px] text-black font-semibold mb-2">
            Marital Status
          </h5>
          <div className="flex justify-between items-center">
            {maritalStatuses.map((status) => (
              <div key={status.marital_sts_id}>
                <input
                  type="checkbox"
                  id={`maritalStatus-${status.marital_sts_id}`}
                  value={status.marital_sts_id.toString()}
                  checked={selectedMaritalStatuses.includes(
                    status.marital_sts_id.toString(),
                  )}
                  onChange={(e) =>
                    handleMaritalStatusChange(
                      status.marital_sts_id.toString(),
                      e.target.checked,
                    )
                  }
                />
                <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
                  {status.marital_sts_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[18px] text-primary font-semibold mb-2">Annual Income Preference</h5>
          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="No income"
                name="pref_anual_income"
                value="No income"
              />
              <label htmlFor="No income" className="pl-1">No income</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Under 50000"
                name="pref_anual_income"
                value="Under 50000"
              />
              <label htmlFor="Under 50000" className="pl-1">Under 50000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 50,001 - 1,00,000"
                name="pref_anual_income"
                value="Rs 50,001 - 1,00,000"
              />
              <label htmlFor="Rs 50,001 - 1,00,000" className="pl-1">Rs 50,001 - 1,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 100,001 - 2,00,000"
                name="pref_anual_income"
                value="Rs 100,001 - 2,00,000"
              />
              <label htmlFor="Rs 100,001 - 2,00,000" className="pl-1">Rs 100,001 - 2,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 3,00,001 - 4,00,000"
                name="pref_anual_income"
                value="Rs 3,00,001 - 4,00,000"
              />
              <label htmlFor="Rs 3,00,001 - 4,00,000" className="pl-1">Rs 3,00,001 - 4,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 4,00,001 - 5,00,000"
                name="pref_anual_income"
                value="Rs 4,00,001 - 5,00,000"
              />
              <label htmlFor="Rs 4,00,001 - 5,00,000" className="pl-1">Rs 4,00,001 - 5,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Rs 5,00,001 - 75,00,000"
                name="pref_anual_income"
                value="Rs 5,00,001 - 75,00,000"
              />
              <label htmlFor="Rs 5,00,001 - 75,00,000" className="pl-1">Rs 5,00,001 - 75,00,000</label>
            </div>
          </div>
        </div>



        <div>
          <div className="justify-start items-center gap-x-5 text-black">
            {matchStars
              .sort((a, b) => b[0].match_count - a[0].match_count)
              .map((matchCountArray, index) => {
                const starAndRasi = matchCountArray.map((star) => ({
                  id: star.id.toString(),
                  star: star.matching_starname,
                  rasi: star.matching_rasiname,
                }));

                const matchCountValue = matchCountArray[0].match_count;

                return (
                  <MatchingStars
                    key={index}
                    initialPoruthas={`No of porutham ${matchCountValue}`}
                    starAndRasi={starAndRasi}
                    selectedStarIds={selectedStarIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                );
              })}
          </div>
        </div>

        {/* <div>
          <div className="justify-start items-center gap-x-5 text-black">
            {matchStars
              .sort((a, b) => b[0].match_count - a[0].match_count)
              .map((matchCountArray, index) => {
                const starAndRasi = matchCountArray.map((star) => ({
                  id: star.id.toString(),
                  star: star.matching_starname,
                  rasi: star.matching_rasiname,
                }));

                const matchCountValue = matchCountArray[0].match_count;

                return (
                  <MatchingStars
                    key={index}
                    initialPoruthas={`No of porutham ${matchCountValue}`}
                    starAndRasi={starAndRasi}
                    selectedStarIds={selectedStarIds}
                    onCheckboxChange={handleCheckboxChange}
                  />
                );
              })}
          </div>
        </div> */}


      </div>
      


      <div className="button">
        <button onClick={handleSave} className="btn btn-primary">Save</button>
        <button onClick={() => navigate('/admin')} className="btn btn-secondary">Cancel</button>
      </div>


    </div>




  );
};

export default EditProfilePage;
