import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaPlus, FaMinus } from 'react-icons/fa';
import './GuestDropdown.css';

function GuestDropdown() {
    const [open, setOpen] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    const [tempAdults, setTempAdults] = useState(adults);
    const [tempChildren, setTempChildren] = useState(children);
    const [tempRooms, setTempRooms] = useState(rooms);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => setOpen(!open);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const increment = (setter, value) => {
        setter(value + 1);
    };

    const decrement = (setter, value) => {
        if (value > 0) {
            setter(value - 1);
        }
    };

    const handleRoomIncrement = () => {
        const newValue = tempRooms + 1;
        setTempRooms(newValue);
    };

    const handleRoomDecrement = () => {
        const newValue = tempRooms - 1;
        if (newValue >= 1) {
            setTempRooms(newValue);
        }
    };

    const handleAdultIncrement = () => {
        const newValue = tempAdults + 1;
        setTempAdults(newValue);
    };

    const handleAdultDecrement = () => {
        const newValue = tempAdults - 1;
        if (newValue >= 0) {
            setTempAdults(newValue);
        }
    };

    const handleChildIncrement = () => {
        const newValue = tempChildren + 1;
        setTempChildren(newValue);
    };

    const handleChildDecrement = () => {
        const newValue = tempChildren - 1;
        if (newValue >= 0) {
            setTempChildren(newValue);
        }
    };

    const applyChanges = () => {
        setAdults(tempAdults);
        setChildren(tempChildren);
        setRooms(tempRooms);
        setOpen(false);
    };

    const totalGuests = tempAdults + tempChildren;

    return (
        <div className="guest-dropdown" ref={dropdownRef}>
            <div className="input-container" onClick={toggleDropdown}>
                <input
                    type="text"
                    readOnly
                    className="form-input"
                    value={`${rooms} Room | ${adults + children} Guest${adults + children > 1 ? 's' : ''}`}
                />
                <FaUser className="input-icon" />
            </div>
            {open && (
                <div className="dropdown-menu">
                    <div className="dropdown-item">
                        <span>Rooms</span>
                        <div className="counter">
                            <button onClick={(e) => { e.preventDefault(); handleRoomDecrement(); }}><FaMinus /></button>
                            <span>{tempRooms}</span>
                            <button onClick={(e) => { e.preventDefault(); handleRoomIncrement(); }}><FaPlus /></button>
                        </div>
                    </div>
                    <div className="dropdown-item">
                        <span>Adults</span>
                        <div className="counter">
                            <button onClick={(e) => { e.preventDefault(); handleAdultDecrement(); }}><FaMinus /></button>
                            <span>{tempAdults}</span>
                            <button onClick={(e) => { e.preventDefault(); handleAdultIncrement(); }}><FaPlus /></button>
                        </div>
                    </div>
                    <div className="dropdown-item">
                        <span>Children</span>
                        <div className="counter">
                            <button onClick={(e) => { e.preventDefault(); handleChildDecrement(); }}><FaMinus /></button>
                            <span>{tempChildren}</span>
                            <button onClick={(e) => { e.preventDefault(); handleChildIncrement(); }}><FaPlus /></button>
                        </div>
                    </div>
                    <div className="apply-button-container">
                        <button className="apply-button" onClick={applyChanges}>Apply</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GuestDropdown;
