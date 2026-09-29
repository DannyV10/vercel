"use client";

import { useEffect, useState, useRef } from "react";

const locations = [
  { city: "Help Desk", region: "Phone, email & chat", latency: "Online" },
  { city: "Network Operations", region: "24/7 infrastructure monitoring", latency: "Online" },
  { city: "Security Operations", region: "Threat detection & response", latency: "Online" },
  { city: "Backup & Recovery", region: "Nightly verified snapshots", latency: "Online" },
  { city: "Field Services", region: "On-site dispatch", latency: "4h ETA" },
  { city: "vCIO Advisory", region: "Strategy & budgeting", latency: "Booking" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Coverage
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Always on.
              <br />
              Always local.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              A U.S.-based team of certified engineers backs every client, around the
              clock. Remote fixes in minutes, on-site technicians when you need hands on keyboards.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Live support</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">99.99%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">&lt;15m</div>
                <div className="text-sm text-muted-foreground">Response time</div>
              </div>
            </div>
          </div>

          {/* Right: Location list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Service Desk</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All operational
                </span>
              </div>

              {/* Locations */}
              <div>
                {locations.map((location, index) => (
                  <div
                    key={location.city}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-foreground" : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{location.city}</div>
                        <div className="text-sm text-muted-foreground">{location.region}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{location.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
