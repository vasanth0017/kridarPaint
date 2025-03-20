"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Paintbrush,
  Leaf,
  Shield,
  ChevronRight,
  Star,
  Droplets,
  Palette,
  Wind,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const collectionRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, {
    once: false,
    amount: 0.3,
  });
  const collectionInView = useInView(collectionRef, {
    once: false,
    amount: 0.3,
  });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  // Color palette
  const colors = [
    { name: "Desert Sand", code: "#E5CAA8" },
    { name: "Forest Moss", code: "#606C38" },
    { name: "Terracotta", code: "#C06D5F" },
    { name: "Azure Blue", code: "#457B9D" },
    { name: "Olive Stone", code: "#A68C69" },
    { name: "Charcoal", code: "#264653" },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Alexandra Green",
      role: "Interior Designer",
      content:
        "The natural textures in Kridar's paints give my designs a depth that synthetic paints simply cannot match. My clients rave about the unique aesthetic and environmental benefits.",
      rating: 5,
    },
    {
      name: "Michael Roberts",
      role: "Eco-Home Developer",
      content:
        "We exclusively use Kridar paints for all our sustainable home projects. The quality is unmatched, and it aligns perfectly with our environmental values.",
      rating: 5,
    },
    {
      name: "Sophia Chen",
      role: "Wellness Architect",
      content:
        "After discovering Kridar's non-toxic paints, I won't use anything else. The natural ingredients create healthier spaces with beautiful, timeless colors.",
      rating: 5,
    },
  ];

  // Features data
  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description:
        "Crafted from earth minerals, plant extracts, and natural pigments with zero synthetic additives.",
    },
    {
      icon: Shield,
      title: "Non-Toxic",
      description:
        "Free from VOCs, formaldehyde, and harmful chemicals for healthier indoor air quality.",
    },
    {
      icon: Droplets,
      title: "Breathable",
      description:
        "Our mineral-based formulation allows walls to breathe, preventing mold and humidity issues.",
    },
    {
      icon: Palette,
      title: "Timeless Colors",
      description:
        "Natural pigments create depth and subtle variation that synthetic paints cannot replicate.",
    },
  ];

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-screen flex flex-col justify-center items-center relative pt-24 px-4"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 bg-primary"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-blue-500"
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <motion.div
          className="z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="font-light">Nature's</span>{" "}
            <span className="font-medium">Palette</span>{" "}
            <span className="font-light">for Your Home</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover luxury paints crafted from natural minerals and plant-based
            pigments. Experience the subtle depth and timeless beauty that only
            nature can inspire.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button className="bg-white hover:bg-white/90 text-black font-medium px-8 py-6 rounded-md">
              Explore Collection
            </Button>
            <Button
              variant="outline"
              className="bg-transparent hover:bg-neutral-800 hover:text-white border-zinc-700 hover:border-white px-8 py-6 rounded-md"
            >
              Our Process
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-0 right-0 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronRight className="h-8 w-8 text-primary rotate-90" />
        </motion.div>
      </motion.section>

      {/* Color Palette Section */}
      <motion.section
        ref={collectionRef}
        className="py-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: collectionInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: collectionInView ? 1 : 0,
              y: collectionInView ? 0 : 30,
            }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">
              Natural Color Collection
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our colors are derived from earth minerals and plant extracts,
              providing unique depth and subtle variations that synthetic paints
              cannot replicate.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                className="relative overflow-hidden rounded-md aspect-square cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: collectionInView ? 1 : 0,
                  y: collectionInView ? 0 : 30,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{ backgroundColor: color.code }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="font-medium text-white">{color.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: collectionInView ? 1 : 0,
              y: collectionInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button
              variant="outline"
              className="bg-transparent hover:bg-neutral-800 hover:text-white border-zinc-700 hover:border-white px-8 py-6 rounded-md"
            >
              View All Colors <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="py-24 px-4 bg-zinc-900/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: featuresInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: featuresInView ? 1 : 0,
              y: featuresInView ? 0 : 30,
            }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">
              Why Choose Natural Paint
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our paints are crafted with precision and care, combining ancient
              techniques with modern standards to create truly exceptional
              finishes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: featuresInView ? 1 : 0,
                  y: featuresInView ? 0 : 30,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/40 border border-zinc-800 rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: featuresInView ? 1 : 0,
              y: featuresInView ? 0 : 30,
            }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="md:col-span-1">
              <h3 className="text-2xl font-serif mb-4">Our Commitment</h3>
              <p className="text-zinc-400">
                Every can of Kridar paint represents our commitment to
                sustainability, craftsmanship, and timeless beauty.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Zero synthetic additives",
                "Ethically sourced ingredients",
                "Low environmental impact",
                "Supports sustainable farming",
                "Handcrafted in small batches",
                "Plastic-free packaging",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: featuresInView ? 1 : 0,
                    x: featuresInView ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        ref={testimonialsRef}
        className="py-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: testimonialsInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: testimonialsInView ? 1 : 0,
              y: testimonialsInView ? 0 : 30,
            }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">
              What Our Clients Say
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Transforming spaces with natural beauty and sustainable luxury.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: testimonialsInView ? 1 : 0,
                  y: testimonialsInView ? 0 : 30,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-zinc-300 italic mb-6">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        ref={ctaRef}
        className="py-24 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: ctaInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-20 bg-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-5xl font-serif tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Space with{" "}
            <span className="text-primary">Natural Luxury</span>
          </motion.h2>

          <motion.p
            className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the difference that natural pigments, eco-friendly
            ingredients, and artisanal craftsmanship can make in your home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button className="bg-white hover:bg-white/90 text-black font-medium px-8 py-6 rounded-md">
              Schedule a Consultation
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
