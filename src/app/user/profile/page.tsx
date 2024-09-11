'use client';
import ProfileSidebar from '@/components/ProfileSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import { UserContext } from '@/contexts/UserContext';
import withRole from '@/hoc/roleGuard';
import router from 'next/router';

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const [email, setEmail] = React.useState<string | undefined>(undefined);
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('MALE');
  const [date, setDate] = React.useState<Date | null>(new Date());
  const { user } = React.useContext(UserContext);
  const token = localStorage.getItem('token');

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiCall.get('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    onSuccess: (data) => {
      setFirstName(data.result[0].firstName);
      setLastName(data.result[0].lastName);
      setAddress(data.result[0].address);
      setDate(data.result[0].dateOfBirth);
      setGender(data.result[0].gender);
      console.log(data.result[0].firstName);
    },
    onError: (error: any) => {},
  });

  React.useEffect(() => {
    mutation.mutate();

    setEmail(user?.email);
    console.log(email);
  }, [mutation, setEmail , email, user?.email ]);

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-5 ml-[30rem]">
        <div className="w-full flex flex-col justify-center gap-5 items-start h-auto">
          <div className="w-full ">
            <p className="text-2xl">Your profile</p>
            <p className="text-slate-500">
              Real time information about your profile
            </p>
          </div>
          <div className="w-full h-0.5 bg-slate-200"></div>
          <div className="w-full p-10 flex justify-between items-center">
            <div className="w-full flex items-center">
              <div className="w-36 h-36 rounded-full relative bg-slate-400">
                <Image
                  layout="fill"
                  src="/blackpink.webp"
                  objectFit="cover"
                  alt="image"
                  className="rounded-full"
                />
              </div>
              <div className="mx-10">
                <p className="font-bold">Avatar</p>
                <p>Upload image under 1MB</p>
              </div>
            </div>
            <div className="flex gap-5">
              <Button className="bg-slate-400 text-xl">Upload Picture</Button>
              <Button className="bg-red-600 text-xl">Delete</Button>
            </div>
          </div>
          <div className="flex-col flex w-full h-auto gap-5">
            <div className="w-full">
              <p className="text-xl">Email</p>
            </div>
            <div className="w-full">
              <Input
                type="email"
                placeholder={email}
                className="border-b-slate-600 text-xl border-0 border-b-2 rounded-none focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex-col flex w-full h-auto gap-5">
            <div className="w-full">
              <p className="text-xl">Phone number</p>
            </div>
            <div className="w-full">
              <PhoneInput
                international
                defaultCountry="US"
                value={phone}
                onChange={(value) => setPhone(value || '')}
                className="w-full text-xl border-b-2 p-3 border-slate-600 focus:ring-0 focus:outline-none focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex-col flex w-full h-auto gap-5">
            <div className="w-full">
              <p className="text-xl">First name</p>
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder={firstName}
                className="border-b-slate-600 text-xl border-0 border-b-2 rounded-none focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex-col flex w-full h-auto gap-5">
            <div className="w-full">
              <p className="text-xl">Last name</p>
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder={lastName}
                className="border-b-slate-600 text-xl border-0 border-b-2 rounded-none focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex-col flex w-full h-auto gap-5">
            <div className="w-full">
              <p className="text-xl">Address</p>
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder={address}
                className="border-b-slate-600 text-xl border-0 border-b-2 rounded-none focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex-col flex w-full h-auto gap-5">
            <div className="w-full">
              <p className="text-xl">Date of birth</p>
            </div>
            <div className="w-full">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="border-b-slate-600 text-xl border-0 border-b-2 rounded-none focus:ring-0 focus-visible:ring-0 "
              />
            </div>
          </div>

          <div className="flex-col flex w-full h-auto gap-5">
            <div className="w-full">
              <p className="text-xl">Gender</p>
            </div>
            <RadioGroup
              className="w-full flex gap-5"
              value={gender}
              onValueChange={(value) => setGender(value)}
            >
              <div className="flex justify-center items-center gap-5">
                <RadioGroupItem className="border-black" value="MALE" />
                <Label className="text-xl font-bold">Male</Label>
              </div>
              <div className="flex justify-center items-center gap-5">
                <RadioGroupItem className="border-black" value="FEMALE" />
                <Label className="text-xl font-bold">Female</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="sticky bottom-0 right-0 w-full bg-slate-50 flex justify-end items-end p-3 rounded-xl">
            <Button className="text-2xl h-16 rounded-2xl  bg-blue-300">
              Save Information
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRole(Profile, 'USER');
