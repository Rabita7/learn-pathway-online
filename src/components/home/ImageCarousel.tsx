
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';

const schoolImages = [
  {
    src: "/lovable-uploads/ad18b617-65cf-4042-bacd-ea5985be7dcd.png",
    alt: "Teacher engaging with classroom of students",
    caption: "Interactive classroom environment with engaged students"
  },
  {
    src: "/lovable-uploads/81944bc0-ae37-4608-afee-4f4ae9d45726.png",
    alt: "Teacher interacting with students raising hands",
    caption: "Active participation in classroom discussions"
  },
  {
    src: "/lovable-uploads/1257f99c-c1a0-45e8-a47b-fa818e4dfe33.png", 
    alt: "School buses in parking lot",
    caption: "Safe and reliable transportation services"
  },
  {
    src: "/lovable-uploads/4171ebc7-9c1f-41c4-98e4-2c8285af94b7.png",
    alt: "Graduates throwing caps in celebration",
    caption: "Celebrating academic achievements and success"
  }
];

const ImageCarousel = () => {
  const [api, setApi] = useState<any>(null);
  
  // Setup autoplay functionality using useEffect
  useEffect(() => {
    if (!api) return;
    
    // Set an interval for autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    // Clear interval on component unmount
    return () => clearInterval(autoplayInterval);
  }, [api]);

  return (
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our School Life
        </h2>
        <div className="relative mx-auto max-w-5xl">
          <Carousel 
            className="w-full" 
            opts={{ loop: true, align: "start" }}
            setApi={setApi}
          >
            <CarouselContent>
              {schoolImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-full">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full aspect-[16/9] object-cover"
                      />
                      <div className="p-4 bg-gray-50">
                        <p className="text-sm text-gray-600">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-12 -right-12 hidden md:flex">
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
