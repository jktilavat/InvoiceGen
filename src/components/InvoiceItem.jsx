import React, { useEffect, useState } from 'react';
import InvoiceField from './InvoiceField';
import FormInput from './FormInput/FormInput';

const InvoiceItem = ({ id, name, inch, watt, qty, price, onDeleteItem, onEdtiItem,inputRef }) => {
  const [ItemsData, setItemsData] = useState([
    "Classic","A-Plus","Beeta","New-Audio","DynaTack", "BM", "P-Audio", "YP", "Audio-Tone", "JBL", "Ahuja", "Pioneer","Sony Xplod"
  ]);
  const [inchData, setInchData] = useState([
    "3", "4", "6","6 × 9", "8", "10", "12", "15", "18", "22", 
  ]);
  const [wattData, setWattData] = useState([
    "50", "100", "200","250","300", "400", "500", "600", "1000", "1200", "1500","2000","2500" 
  ]);

  useEffect(() => {
    const ItemsDataClone = [...ItemsData]
    const InchDataClone = [...inchData]
    const WattDataClone = [...wattData]
    const sortedItemsData = ItemsDataClone.length > 0 && ItemsDataClone?.sort((a, b) => a.localeCompare(b));
    const sortedInchData = InchDataClone.length > 0 && InchDataClone?.sort((a, b) => a-b);
    const sortedWattData = WattDataClone.length > 0 && WattDataClone?.sort((a, b) => a-b);
    setItemsData(sortedItemsData)
    setInchData(sortedInchData)
    setWattData(sortedWattData)
  }, [])
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <div className='mb-4'>
      <div className='flex gap-1 w-full'>
        <div className='border rounded-md p-0.5 shadow-3Min w-full'>
          <div className='p-2'>
            <div className="mb-2">
              {/*<FormInput ref={inputRef} type='text' list="itemslist" placeholder='Item Name' label='Item Name' name="name" id={id} value={name} onChange={(e) => onEdtiItem(e)} />*/}
              <label className='font-bold text-sm text-[#0a1747]'>Item Name</label>
              <input className='mt-1' ref={inputRef} type='text' list="itemslist" placeholder='Item Name' name="name" id={id} value={name} onChange={(e) => onEdtiItem(e)}/>
              <datalist id="itemslist" >
                {ItemsData?.length > 0 && ItemsData?.map((item, index) => {
                  return (
                    <option key={index} value={`${item}`} />
                  )
                })}
              </datalist>
            </div>

            <div className='flex gap-2'>
              <div className='mb-2'>
                <FormInput type='text' list="inchlist" placeholder='Inch' label='Inch' name="inch" id={id} value={inch} onChange={(e) => onEdtiItem(e)} />
                <datalist id="inchlist" >
                {inchData?.length > 0 && inchData?.map((item, index) => {
                  return (
                    <option key={index} value={`${item}`} />
                  )
                })}
              </datalist>
              </div>
              <div className='mb-2'>
                <FormInput type='text' list="wattlist" placeholder='Watt' label='Watt' name="watt" id={id} value={watt} onChange={(e) => onEdtiItem(e)} />
                <datalist id="wattlist" >
                {wattData?.length > 0 && wattData?.map((item, index) => {
                  return (
                    <option key={index} value={`${item}`} />
                  )
                })}
              </datalist>
              </div>
            </div>

            <div className='flex gap-2'>
              <div className='mb-2'>
                <FormInput type='number' placeholder='Qty' label='Qty' name="qty" id={id} value={qty} onChange={(e) => onEdtiItem(e)} />
              </div>
              <div className='mb-2'>
                <FormInput type='number' placeholder='Price' label='Price' name="price" id={id} value={price} onChange={(e) => onEdtiItem(e)} />
              </div>
            </div>
            {/*<InvoiceField
              className='mb-1'
              onEditItem={(event) => onEdtiItem(event)}
              cellData={{
                placeholder: 'Item name',
                type: 'text',
                name: 'name',
                id: id,
                value: name,

              }}
            />
            <div className='flex gap-2 mb-2'>
              <InvoiceField
                className='text-center'
                onEditItem={(event) => onEdtiItem(event)}
                cellData={{
                  type: 'number',
                  min: '1',
                  name: 'qty',
                  id: id,
                  value: qty,
                  placeholder: 'Qty'
                }}
              />

              <div className='flex relative'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 sm:left-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <InvoiceField
                  onEditItem={(event) => onEdtiItem(event)}
                  cellData={{
                    className: 'text-right',
                    type: 'number',
                    min: '0.01',
                    step: '0.01',
                    name: 'price',
                    id: id,
                    value: price,
                    placeholder: 'Price'
                  }}
                />
              </div>

            </div>
            <div className='mb-2'>
              <InvoiceField
                onEditItem={(event) => onEdtiItem(event)}
                cellData={{
                  className: 'text-right',
                  type: 'number',
                  min: '0.01',
                  step: '0.01',
                  name: 'price',
                  id: id,
                  value: inch,
                  placeholder: 'Inch'
                }}
              />
            </div>

            <div>
              <InvoiceField
                onEditItem={(event) => onEdtiItem(event)}
                cellData={{
                  className: 'text-right',
                  type: 'number',
                  min: '0.01',
                  step: '0.01',
                  name: 'price',
                  id: id,
                  value: watt,
                  placeholder: 'Watt'
                }}
              />
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
