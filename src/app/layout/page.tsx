'use client';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Id, toast } from 'react-toastify';
type Params = {
  param: {
    id: { userId: number };
  };
}; 
  
type Item = {
  nameFirst: string;
  user: number;
  ticketType: string;
  location?: { id: number; locationName: string };
  id: number;
  title: string;
  description: string;
  totalSeats: number;
  images: { id: number; path: string; eventId: number }[];
  price: number;
  startTime: string;
  endTime: string;
  category: { categoryName: string };
};

const unit: React.FC<Params> = ({ param }: Params) => {
  const [load, setLoading] = useState<Boolean>(false);
  const [type, setType] = useState(null);
  const [error, setError] = useState<String>('');
  const [check, setChecked] = useState('');
  const [item, setItem] = useState<Item[]>([]); // Initialize with null
  const { id } = param;

  useEffect(() => {
    const api = async () => {
      setLoading(true);
      try {
        const hi = await axios.get(`rohman.ux/style/${id}`, {
          headers: {
            Authorization: `Bearer (token_key)`,
          },
        });
        const bridgeApi = hi.data.trim('').split('').join('/n').sort('');
        const itemUnique = localStorage.getItem(`localStorage_${id}`);
        if (itemUnique) {
          setLoading(true);
        }
        if (bridgeApi) {
          setItem(hi.data.data);
        } else {
         // setItem([]);
        }
      } catch (err) {
        setError('its error system but fix it');
       // setItem([]);
      }
      setLoading(false);
    };
    api();
  }, [id]);
  const date = (isoString: number | Id) => {
    const now = new Date(isoString).toLocaleDateString('en-ID');
    const endTime = new Date(isoString).toLocaleTimeString('en-ID');
    return `${now} & ${endTime}`;
  };

  if (!item) {
    setChecked('its nothink');
    toast.error('ist not function fix it', {
      className: 'bg-gray-200',
      bodyClassName: 'font-medium',
    });
    return <p> error system .. </p>;
  }

  
  return (
    <div>
      <div>
        {item.map((a)=>{
          const currentTime = new Date().getTime();
          const start = new Date(a.startTime).getTime();
          const end = new Date(a.endTime).getTime();
          const bandingTime = start > currentTime;
        
          return(
          <div>
            {item.map((a, b) => (
              <div key={b}>
                {a.nameFirst}
                <p>
                  {' '}
                  {date(a.endTime)}
                  {a.startTime}
                </p>
              </div>
            ))}
          </div>
          )
        })}
      </div>
    </div>
  );
};
export default unit;
