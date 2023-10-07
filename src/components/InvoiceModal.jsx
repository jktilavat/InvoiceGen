import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toPng } from 'html-to-image'
import download from 'downloadjs'
import gPay from '../Images/gPay.svg'
import './invoiceForm.css'

const InvoiceModal = ({
  subQty,
  customerName,
  indianTime,
  isChecked,
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  const date = new Date();
  const today = date.toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  const [loader, setLoader] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const ref = useRef();
  const SaveAsPDFHandler = async () => {
    if (ref && ref.current) {
      setLoader(true);
      await toPng(ref.current, { cacheBust: true, includeQueryParams: true, })
      const convertToPng = await toPng(ref.current, { cacheBust: true, includeQueryParams: true, });
      await download(convertToPng, `${customerName}-${today}.png`)
      setLoader(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-2 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 z-10 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              {/*<div className='flex justify-end p-2 pb-0 ' >
                <img src={closeIcon} height={30} width={30} cursor-pointer onClick={() => closeModal()} />
              </div>*/}
              <div className="py-0 px-2 bg-white relative z-10" id="print" ref={ref}>
                <defs>
                  <style>
                    @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
                  </style>
                </defs>

                <div className='flex justify-center'>
                  <div style={{ letterSpacing: '1px' }} className="flex w-[80%] mt-4 pb-2 flex-col text-center border-b-[1px] font-bold text-gray-900 text-2xl ">
                    <span style={{ fontFamily: 'Young Serif', color: '#0a1747' }}><span style={{ color: 'red' }}>S</span>hree <span style={{ color: 'red' }}>R</span>am</span>
                    <span style={{ fontFamily: 'Young Serif', color: '#0a1747' }}><span style={{ color: 'red' }}>S</span>peaker <span style={{ color: 'red' }}>R</span>eckoning</span>
                  </div>
                </div>
                <div className='flex justify-between mt-3 text-base'>
                  <div className='flex flex-row'>
                    <div className='flex flex-col'>
                      <div>Rajnibhai Tilavat</div>
                      <div className='flex items-center'>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" fill="#20c997">
                            <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
                          </svg>
                        </span>

                        <div className='w-[18px] h-[18px] border border-[#0a1747] rounded-[50%] relative mr-[0.1rem]'>
                          <img src={gPay} width={'100%'} height={'100%'} alt='g-pay' />
                        </div>
                        99985 52997</div>
                    </div>
                  </div>
                  <div className='flex flex-row'>
                    <div className='flex flex-col text-center items-center'>
                      <div>Jaydeep Tilavat</div>
                      <div className='flex items-center'>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" fill="#20c997">
                            <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
                          </svg>
                        </span>
                        84870 95955</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex flex-col">
                    <span className="flex space-x-2 text-base">
                      <span className="font-bold">Customer Name:</span>
                      <span>{invoiceInfo.customerName}</span>
                    </span>
                    <span className="flex space-x-2 text-base">
                      <span className="font-bold"> Date: </span>
                      <span>{today}</span>
                    </span>
                    {isChecked &&
                      <div className="flex min-w-max space-x-2 text-base">
                        <div className="font-bold"> Time: </div>
                        <div className='w-full'>{indianTime}</div>
                      </div>
                    }

                  </div>

                  <div className='mt-10'>
                    <div className='overflow-hidden border border-black/10 border-l-0 border-r-0 text-[15px] py-1 flex gap-1 w-full font-semibold items-center justify-center'>
                      <div className='border-0 w-[50%] justify-start flex items-start '>Item</div>
                      <div className='border-0 w-[20%] justify-start flex items-start '>Inch</div>
                      <div className='border-0 w-[20%] justify-end flex items-end '>Watt</div>
                      <div className='border-0 w-[20%] justify-center flex items-end '>Qty</div>
                      <div className='border-0 w-[20%] justify-end flex items-end '>Price</div>
                      <div className='border-0 w-[20%] justify-end flex items-end '>Amt</div>
                    </div>

                    {items.map((item) => (
                      <div key={item?.id} className={` py-1 flex gap-1 w-full items-center justify-center mt-1`}>
                        <div className='w-[50%] justify-start flex items-start'>{item?.name}</div>
                        <div className='w-[20%] justify-center flex items-start'>{item?.inch}"</div>
                        <div className='w-[20%] justify-end flex items-end'>{item?.watt}W</div>
                        <div className='w-[20%] justify-center flex items-end'>{item?.qty}</div>
                        <div className='w-[20%] justify-end flex items-end'>{item?.price}</div>
                        <div className='w-[20%] justify-end flex items-end'>{item?.price * item?.qty}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col items-end space-y-2">

                    <div className='flex w-full border-t border-black/10 py-2'>
                      <div className='w-[68%] flex justify-between'>
                        <div className='border-0 justify-start flex items-star font-bold'>Total:</div>
                        <div className='border-0 justify-start flex items-start font-bold'>{subQty}</div>
                      </div>

                      <div className='border-0 w-[32%] justify-end flex items-end font-bold'>
                        ₹ {invoiceInfo.total % 1 === 0
                          ? invoiceInfo.total.toLocaleString('en-IN')
                          : invoiceInfo.total.toLocaleString('en-IN').toFixed(0)}/-
                      </div>
                    </div>

                    {/*<div className='border-t w-full'></div>*/}
                    <div className='pt-5 w-full pb-1 font-medium text-xs text-center flex justify-center'>All types of Speaker🔈reckoning </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 px-4 py-6 z-10">
                <button
                  //onClick={addNextInvoiceHandler}
                  onClick={() => closeModal()}
                  className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                >
                  {/*<svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>*/}
                  <span><span style={{ fontSize: '15px' }}>❎</span> Cancel</span>
                </button>
                <button onClick={SaveAsPDFHandler} type="button" class="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white">
                  {loader &&
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                  }
                  {!loader && <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>}
                  {loader ? "Loading..." : "Download"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
