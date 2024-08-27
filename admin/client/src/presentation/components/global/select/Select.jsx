import React from "react";
import { AutoComplete } from "primereact/autocomplete";
import './Select.css';
import '../../../css/variables.css';

const DropdownDemo = ({
    error,
    width,
    allItems,
    placeholder,
    value,
    setValue,
    items,
    setItems

}) => {

    const search = (event) => {
        const query = event.query.toLowerCase();
        const filteredItems = allItems.filter((item) => 
            item.toLowerCase().includes(query)
        );
        setItems(filteredItems);
    };

    return (
        <div  className="card flex justify-content-center" >
            <AutoComplete 
                style={error ?{border:'var(--border-width) solid var(--error-color)', width:width}:{width:width}}
                value={value} 
                suggestions={items} 
                completeMethod={search} 
                onChange={(e) => setValue(e.value)} 
                dropdown 
                placeholder={placeholder}
            />
        </div>
    );
};

export default DropdownDemo;
