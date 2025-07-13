import React from "react";
import { useRef, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    // const accordionRef = useRef<HTMLDivElement | null>(null);
    // const contentRef = useRef<HTMLDivElement | null>(null);
  
    const accordionData = [
      {
        title: 'Section 1',
        content: 'This is the content of Section 1.',
      },
      {
        title: 'Section 2',
        content: 'This is the content of Section 2.',
      },
      {
        title: 'Section 3',
        content: 'This is the content of Section 3.',
      },
    ];
  
    const handleToggle = (index) => {
      if (activeIndex === index) {
        setActiveIndex(null);
        // contentRef.current.style.height = '0px';
      } else {
        setActiveIndex(index);
        // contentRef.current.style.height = '100px';
      }
    };
  
    return (
      <div className="accordion">
        {accordionData.map((item, index) => (
          <div key={index} className="accordion-item">
            <div
              className={`accordion-title ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleToggle(index)}
            >
              {item.title}
              {/* {activeIndex === index?<FontAwesomeIcon icon="fa-solid fa-check" />:""} */}
              {/* <FontAwesomeIcon
              icon={activeIndex === index ? "fa-solid fa-check": ""}
              className="accordion-icon"
            /> */}

            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default Accordion;
  