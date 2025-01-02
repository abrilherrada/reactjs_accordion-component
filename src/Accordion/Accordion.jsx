import React, {useState} from "react";
import AccordionItem from "../AccordionItem/AccordionItem.jsx";
import data from "./AccordionData.js";
import styles from "./Accordion.module.css";

function Accordion () {
    const [currentIndex, setCurrentIndex] = useState(null);
    
    const handleItemClick = (index) => {
        setCurrentIndex((previousIndex) => (previousIndex === index ? null : index));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>FAQ</h1>
            {data.map((item, index) => (
                <AccordionItem  key={index} 
                                question={item.question}
                                answer={item.answer} 
                                isOpen={currentIndex === index} 
                                onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    )
}

export default Accordion;