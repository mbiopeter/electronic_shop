import React from "react";
import { ColorPicker } from 'primereact/colorpicker';
import './ColorInput.css';

export default function ColorInput({ value, onChange }) {
    return (
        <div className="colorPicker">
            <ColorPicker value={value} onChange={(e) => onChange(e)} />
        </div>
    );
}
