import ProfileSidebar from '@/components/ProfileSidebar';
import withRole from '@/hoc/roleGuard';
import Image from 'next/image';
import * as React from 'react';

interface IPaymentHistoryProps {}

const PaymentHistory: React.FunctionComponent<IPaymentHistoryProps> = (
  props,
) => {
  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-5 ml-[30rem]">
        <div className="w-full h-auto justify-center gap-5 flex-col flex items-center">
          <div className="w-full">
            <p className="text-2xl">Your Payment History</p>
          </div>
          <div className="w-full flex gap-10">
            <div>
              <Image
                src="/blackpink.webp"
                alt={'image'}
                width={400}
                height={300}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center text-center items-start gap-3">
              <div>
                <p className="text-2xl font-bold">
                  Born Pink World Tour Jakarta
                </p>
              </div>
              <div>
                <p className="text-xl">Saturday, 10 September 2024</p>
              </div>
              <div>
                <p className="text-xl">Seat: 1</p>
              </div>
              <div>
                <p className="text-xl">Status: PAID</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-0.5"></div>
          <div className="w-full flex gap-10">
            <div>
              <Image
                src="/blackpink.webp"
                alt={'image'}
                width={400}
                height={300}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center text-center items-start gap-3">
              <div>
                <p className="text-2xl font-bold">
                  Born Pink World Tour Jakarta
                </p>
              </div>
              <div>
                <p className="text-xl">Saturday, 10 September 2024</p>
              </div>
              <div>
                <p className="text-xl">Seat: 1</p>
              </div>
              <div>
                <p className="text-xl">Status: PAID</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-0.5"></div>
          <div className="w-full flex gap-10">
            <div>
              <Image
                src="/blackpink.webp"
                alt={'image'}
                width={400}
                height={300}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center text-center items-start gap-3">
              <div>
                <p className="text-2xl font-bold">
                  Born Pink World Tour Jakarta
                </p>
              </div>
              <div>
                <p className="text-xl">Saturday, 10 September 2024</p>
              </div>
              <div>
                <p className="text-xl">Seat: 1</p>
              </div>
              <div>
                <p className="text-xl">Status: PAID</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-0.5"></div>
          <div className="w-full flex gap-10">
            <div>
              <Image
                src="/blackpink.webp"
                alt={'image'}
                width={400}
                height={300}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center text-center items-start gap-3">
              <div>
                <p className="text-2xl font-bold">
                  Born Pink World Tour Jakarta
                </p>
              </div>
              <div>
                <p className="text-xl">Saturday, 10 September 2024</p>
              </div>
              <div>
                <p className="text-xl">Seat: 1</p>
              </div>
              <div>
                <p className="text-xl">Status: PAID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRole(PaymentHistory, 'USER');
