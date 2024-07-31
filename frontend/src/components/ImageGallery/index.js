import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import "./index.css";

const CircularButton = ({ onClick, icon, className, ...props }) => {
  return (
    <Button
      onClick={onClick}
      {...props}
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        minWidth: 0,
        padding: 0,
        backgroundColor: '#1A1E43',
        color: '#fff',
        ...props.style,
      }}
    >
      {icon}
    </Button>
  );
};

function HotelImgSection({ image_details }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const imagesPerSlide = 3;

  let image_list = [];
  for (let i = 0; i < image_details.count; i++) {
    let string_to_push = `${image_details.prefix}${i}${image_details.suffix}`;
    image_list.push(string_to_push);
  }

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(image_list.length / imagesPerSlide));
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + Math.ceil(image_list.length / imagesPerSlide)) % Math.ceil(image_list.length / imagesPerSlide));
  };

  const startIndex = currentSlide * imagesPerSlide;
  const endIndex = startIndex + imagesPerSlide;
  const currentImages = image_list.slice(startIndex, endIndex);

  return (
    <div className="carousel-wrapper">
      {image_list.length === 0 ? (
        <div className="no-images-message" style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'Inter', padding: '50px 0' }}>
          Oops! There's currently no images provided by this hotel.
        </div>
      ) : (
        <>
          <div className="carousel-container">
            <ImageList variant="quilted" cols={3} rowHeight={200} gap={16}>
              {currentImages.map((URL, index) => (
                <ImageListItem key={index} cols={index === 0 ? 2 : 1} rows={index === 0 ? 2 : 1}>
                  <img
                    src={URL}
                    alt={`Hotel Image ${index}`}
                    loading="lazy"
                    style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: 5 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          <div className="controls">
            <CircularButton
              onClick={handlePrev}
              className="circularbutton"
              icon={<ArrowBackIcon />}
              style={{ marginRight: 8 }}
            />
            <CircularButton
              onClick={handleNext}
              className="circularbutton"
              icon={<ArrowForwardIcon />}
              style={{ marginLeft: 8 }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default HotelImgSection;
