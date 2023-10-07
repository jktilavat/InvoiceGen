import React, { useEffect, useRef, useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../helpers/incrementString';
import SwipeToDelete from 'react-swipe-to-delete-component';
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';
import './invoiceForm.css'
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [indianTime, setIndianTime] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const inputRef = useRef(null);
  const [CustomerNameData, setCustomerNameData] = useState([
    {
      "name": "HimanshuBhai",
    },
    {
      "name": "MehulBhai",
    },
    {
      "name": "Honey",
    }
  ]);


  const [singleItem, setSingleItem] = useState(
    {
      id: uid(6),
      name: '',
      inch: '',
      qty: '',
      price: '',
      watt: '',
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
      };
      const timeString = now.toLocaleTimeString('en-US', options);
      setIndianTime(timeString);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('CustomerList');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCustomerNameData(parsedData);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the value of isChecked
  };

  const reviewInvoiceHandler = (event) => {
    const obj = { "name": customerName }
    const itemExists = CustomerNameData.some((item) => item.name === customerName);
    event.preventDefault();
    if (!itemExists) {
      CustomerNameData.push(obj)
      setCustomerNameData(CustomerNameData);
      localStorage.setItem('CustomerList', JSON.stringify(CustomerNameData))
    }
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        inch: '',
        qty: '',
        watt: '',
        price: '',
      },
    ]);
  };

  const addItemHandler = () => {
  
      let latestArray = [...items];
      if(isEdit !== null){
        latestArray[isEdit] = {
          ...singleItem
        }
        setItems(latestArray)
        setIsEdit(null);
        setSingleItem({
          id: uid(6),
          name: '',
          inch: '',
          qty: '',
          price: '',
          watt: '',
        },)
      }
    else{
      items.push(singleItem)
      setItems([...items])
      setSingleItem({
        id: uid(6),
        name: '',
        inch: '',
        qty: '',
        price: '',
        watt: '',
      },)
    }


  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (e) => {
    const newItem = { ...singleItem, [e.target.name]: e.target.value };
    setSingleItem({ ...newItem });
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr?.name?.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  const subQty = items.reduce((prev, curr) => {
    if (curr?.name?.trim().length > 0)
      return prev + Number(curr.qty);
    else return prev;
  }, 0);

  const isDisable = () => {
    if (singleItem) {
      const { name, inch, price, qty, watt } = singleItem;
      if (!name || !inch || !price || !qty || !watt) {
        return true;
      } else {
        return false;
      }
    }
  }

const [isEdit,setIsEdit] = useState(null);

  function handleEdit(index,item){
    inputRef?.current.focus();
    setIsEdit(index);
    setSingleItem({ ...item });
  }
  const isDis = isDisable()

  function ListItem(props) {
    const { item, i, index } = props
    const bgColor = index % 2 === 0 ? "#edeff6" : "#fff"
    const TextColor = index % 2 === 1 ? "#0a1747" : "#0a1747"
    const classes = `px-2 !bg-[${bgColor}] py-1 text-white flex border rounded-md gap-1 w-full items-center justify-center mt-1`
    return (
      <>
        <SwipeToDelete className="my-swipe" key={item.id} onDelete={() => deleteItemHandler(item?.id)} backgroundColor="#ff5733"  buttonWidth={80} rtl={null}>
          <div key={item?.id} style={{ background: bgColor, color: TextColor }} className={classes} onClick={()=>handleEdit(index,item)}>
            <div className='w-[50%] justify-start flex items-start'>{item?.name}</div>
            <div className='w-[20%] justify-start flex items-start'>{item?.inch}"</div>
            <div className='w-[20%] justify-end flex items-end'>{item?.watt}W</div>
            <div className='w-[20%] justify-end flex items-end'>{item?.qty}</div>
            <div className='w-[20%] justify-end flex items-end'>{item?.price}</div>
            <div className='w-[20%] justify-end flex items-end'>{item?.price * item?.qty}</div>
          </div>
        </SwipeToDelete>
      </>
    )
  }

  const list = items.map((item, index) => {
    return (
      <ListItem key={item.id} item={item} i={items.length} index={index} />
    )
  });

  return (
    <form
      className="relative flex flex-col px-2"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-2 md:flex-row md:items-center md:space-y-0">
          <div className="flex justify-between w-full text-[#0a1747]">
            <div>
              <span className="font-bold">Date: </span>
              <span>{today}</span>
            </div>
            <div style={{ minWidth: '130px', display: 'flex', justifyContent: 'end', textAlign: 'end' }}>
              <span className='mr-1'>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </span>
              {indianTime}</div>
          </div>
        </div>
        <div className='flex justify-center border-b'>
          <div style={{ letterSpacing: '1px' }} className="flex w-[80%] pb-2 flex-col text-center font-bold text-gray-900 text-2xl ">
            <span style={{ fontFamily: 'Young Serif', color: '#0a1747' }}><span style={{ color: 'red' }}>S</span>hree <span style={{ color: 'red' }}>R</span>am</span>
            <span style={{ fontFamily: 'Young Serif', color: '#0a1747' }}><span style={{ color: 'red' }}>S</span>peaker <span style={{ color: 'red' }}>R</span>eckoning</span>
          </div>
        </div>
        <div className="flex flex-col pb-8 text-[#0a1747]">
          <label
            htmlFor="customerName"
            className="text-sm font-bold md:text-base"
          >
            Customer Name:
          </label>
          <input id="customerName" autoComplete='off' required list="customers" placeholder="Customer name" name="customerName" onChange={(event) => setCustomerName(event.target.value)} />
          <datalist id="customers" >
            {CustomerNameData?.length > 0 && CustomerNameData?.map((item, index) => {
              return (
                <option key={index} value={item?.name} />
              )
            })}
          </datalist>
        </div>
        <div>
          <InvoiceItem
            inputRef={inputRef}
            id={singleItem?.id}
            name={singleItem?.name}
            inch={singleItem?.inch}
            watt={singleItem?.watt}
            qty={singleItem?.qty}
            price={singleItem?.price}
            onDeleteItem={deleteItemHandler}
            onEdtiItem={edtiItemHandler}
          />


          <button
            className={`w-full mb-10 rounded-md ${!isDis ? ' bg-blue-500' : 'bg-gray-200'} px-4 py-2 text-sm ${!isDis ? 'text-white' : 'text-gray-500'}  `}
            type="button"
            onClick={addItemHandler}
            disabled={isDisable()}
          >
           {isEdit !== null ? "Save" : "Add Item"}
          </button>
          <div className='overflow-hidden px-2 py-2 flex rounded-md gap-1 w-full font-bold items-center justify-center bg-[#0a1747] text-[#fff]'>
            <div className='border-0 w-[50%] justify-start flex items-start'>Name </div>
            <div className='border-0 w-[20%] justify-start flex items-start'>Inch</div>
            <div className='border-0 w-[20%] justify-end flex items-end'>Watt</div>
            <div className='border-0 w-[20%] justify-end flex items-end'>Qty</div>
            <div className='border-0 w-[20%] justify-end flex items-end'>Price</div>
            <div className='border-0 w-[20%] justify-end flex items-end'>Amt</div>
          </div>

          <div className='flex flex-col'>

            <> {items?.length > 0 ? <div className="list-group">{list}</div> : <div className='flex justify-center p-3'>No data found.</div>}</>
          </div>

          <div className='flex rounded-md bg-[#0a1747] text-[#fff] px-2 py-2 mt-2  gap-1 w-full font-bold items-center justify-center'>
            <>
              <div className='border-0 w-[50%]  justify-start flex items-start'>Total </div>
              <div className='border-0 w-[20%] justify-start flex items-start'></div>
              <div className='border-0 w-[20%] justify-end flex items-end'></div>
              <div className='border-0 w-[20%] justify-end flex items-end'>{subQty}</div>
              <div className='border-0 w-[20%] justify-end flex items-end'></div>
              <div className='border-0 w-[20%] justify-end flex items-end'>
                {total % 1 === 0 ? total.toLocaleString('en-IN') : Number(total).toLocaleString('en-IN').toFixed(2)}
              </div>
            </>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            subQty={subQty}
            isChecked={isChecked}
            customerName={customerName}
            indianTime={indianTime}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
