import React, {useEffect, useRef, useState} from "react";
import styles from "./AccordionItem.module.css";

function AccordionItem ({question, answer, isOpen, onClick}) {
    const contentHeight = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (contentHeight.current && isOpen) {
                setHeight(contentHeight.current.scrollHeight);
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            if (isOpen) {
                updateHeight();
            }
        });

        if (contentHeight.current) {
            resizeObserver.observe(contentHeight.current);
        }

        updateHeight();

        return () => {
            if (resizeObserver && contentHeight.current) {
                resizeObserver.unobserve(contentHeight.current);
            }
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className={styles.wrapper}>
            <button className={`${styles.questionContainer} ${isOpen ? styles.active : ""}`} 
                    onClick={onClick}
            >
                <p className={styles.questionContent}>{question}</p>
                <span className={`${styles.arrow} ${isOpen ? styles.active : ""}`}>⌄</span>
            </button>
            <div    ref={contentHeight} 
                    className={styles.answerContainer} 
                    style={{ maxHeight: `${height}px`, overflow: "hidden", transition: "max-height 0.7s ease-in-out" }}
            >
                <p className={styles.answerContent}>{answer}</p>
            </div>
        </div>
    )
}

export default AccordionItem;