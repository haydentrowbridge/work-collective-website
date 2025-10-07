import React, { useState, useEffect } from 'react';

const WorkCollectiveWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [hoveredBox, setHoveredBox] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredModule, setHoveredModule] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridItems = [
    { id: 'home', title: 'Work Collective', bgColor: '#00A6E8', textColor: '#ffffff', shape: 'circle', isLogo: true, description: 'Redeeming 2,000 hours of work in Austin', isVideo: true },
    { id: 'vision', title: 'Vision', bgColor: '#ffffff', textColor: '#00A6E8', shape: 'hexagon', description: '1 million hours of ministry in the workplace' },
    { id: 'mission', title: 'Mission', bgColor: '#00A6E8', textColor: '#ffffff', shape: 'circle', description: 'Equipping ambassadors to integrate faith and work' },
    { id: 'cohort', title: 'Cohort Overview', bgColor: '#ffffff', textColor: '#00A6E8', shape: 'hexagon', description: 'A 9-month transformational journey' },
    { id: 'about', title: 'About', bgColor: '#ffffff', textColor: '#00A6E8', shape: 'hexagon', description: "Building God's kingdom through our work" },
    { id: 'apply', title: 'Apply', bgColor: '#00A6E8', textColor: '#ffffff', shape: 'circle', description: 'We invite you to be a part of workplace revival' },
    { id: 'resources', title: 'Resources', bgColor: '#ffffff', textColor: '#00A6E8', shape: 'hexagon', description: 'Tools and materials for your vocational journey' },
    { id: 'testimonies', title: 'Testimonies', bgColor: '#00A6E8', textColor: '#ffffff', shape: 'circle', description: 'Stories from our community of practitioners' },
  ];

  const renderDots = (size = 100, dotSize = 12, color = '#ffffff', opacity = 0.85) => {
    const numDots = 12;
    return Array.from({ length: numDots }).map((_, i) => {
      const angle = ((i * 360) / numDots + rotation) * (Math.PI / 180);
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: '50%',
            backgroundColor: color,
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)',
            opacity: opacity,
          }}
        />
      );
    });
  };

  const getPageContent = (pageId) => {
    const content = {
      vision: {
        title: 'Vision',
        content:
          'By 2030, we envision 1 million hours of ministry in the workplace—thousands of equipped ambassadors demonstrating and declaring the gospel in every sector through redemptive work.',
      },
      mission: {
        title: 'Mission',
        content:
          "We equip ambassadors of Christ to integrate faith and work, redeeming their 2,000 annual work hours as ministry to the world.",
      },
      about: { 
        title: 'About', 
        content: "Hello, and welcome to your Work Collective Cohort! My name is John Manning. I serve as an elder at The Austin Stone and am passionate about Christians leading lives filled with radical generosity and redemptive work. Part of our church's Joyfully Devoted 2030 Vision is to equip ambassadors of Christ to redeem their vocations and to do ministry in the marketplace. I believe the workplace is one of our greatest opportunities to love our neighbor and make disciples. My hope is that through your cohort experience, you would start to connect your daily work to both the greatest commandments (Matthew 22:37–39) and the Great Commission (Matthew 28:18–20)."
      },
      cohort: {
        title: 'Cohort Overview',
        content: "A transformational journey to align your work with Jesus' greater calling.",
      },
      resources: { 
        title: 'Resources', 
        content: 'Download materials, module guides, and vocational tools to support your journey in redemptive work.' 
      },
      testimonies: {
        title: 'Testimonies',
        content: 'Hear stories from participants living redemptive work in their industries.',
      },
      apply: { 
        title: 'Apply', 
        content: 'Join a cohort and begin your journey toward redemptive work. Fill out the form below to apply for our next cohort.' 
      },
    };
    return content[pageId] || { title: 'Page', content: 'Content coming soon.' };
  };

  const renderPage = () => {
    if (currentPage === 'home') {
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: windowWidth >= 1024 ? 'repeat(4, 1fr)' : windowWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
            gap: 0,
            minHeight: '100vh',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          {gridItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.isVideo) {
                  setCurrentPage('video');
                } else {
                  setCurrentPage(item.id);
                }
              }}
              onMouseEnter={() => setHoveredBox(index)}
              onMouseLeave={() => setHoveredBox(null)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                backgroundColor: item.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                minHeight: '280px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(251,191,36,0.22), rgba(245,158,11,0.14))',
                  opacity: hoveredBox === index ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: 'none'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredBox === index ? 'translateY(200%)' : 'translateY(0)',
                  opacity: hoveredBox === index ? 0 : 1,
                  transition: 'transform 0.7s ease, opacity 0.7s ease',
                  zIndex: 2
                }}
              >
                {item.isLogo ? (
                  <div style={{ position: 'relative', width: 'clamp(200px, 40vw, 350px)', height: 'clamp(200px, 40vw, 350px)' }}>
                    {renderDots(windowWidth < 640 ? 80 : 140, windowWidth < 640 ? 10 : 14)}
                    <div style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      fontSize: 'clamp(24px, 4vw, 36px)', 
                      fontWeight: 'bold', 
                      color: '#ffffff', 
                      textAlign: 'center' 
                    }}>
                      Work<br/>Collective
                    </div>
                  </div>
                ) : (
                  <>
                    {item.shape === 'circle' && (
                      <div style={{ 
                        width: 'clamp(200px, 40vw, 350px)', 
                        height: 'clamp(200px, 40vw, 350px)', 
                        border: `clamp(2px, 0.5vw, 4px) solid ${item.bgColor === '#ffffff' ? 'rgba(0,166,232,0.5)' : 'rgba(255,255,255,0.5)'}`, 
                        borderRadius: '50%' 
                      }} />
                    )}
                    {item.shape === 'hexagon' && (
                      <svg style={{ width: 'clamp(250px, 45vw, 400px)', height: 'clamp(250px, 45vw, 400px)' }} viewBox="0 0 100 100">
                        <path d="M 50 5 L 90 27.5 L 90 72.5 L 50 95 L 10 72.5 L 10 27.5 Z" fill="none" stroke={item.bgColor === '#ffffff' ? 'rgba(0,166,232,0.5)' : 'rgba(255,255,255,0.5)'} strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    )}
                  </>
                )}
              </div>

              {!item.isLogo && (
                <h2
                  style={{
                    position: 'absolute',
                    top: hoveredBox === index ? '24px' : '50%',
                    left: '50%',
                    transform: hoveredBox === index ? 'translate(-50%,0)' : 'translate(-50%,-50%)',
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontWeight: 'bold',
                    color: item.textColor,
                    zIndex: 10,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    transition: 'all 0.6s ease',
                    padding: '0 16px'
                  }}
                >
                  {item.title}
                </h2>
              )}

              <p
                style={{
                  position: 'absolute',
                  fontSize: 'clamp(16px, 2.5vw, 22px)',
                  color: item.textColor,
                  textAlign: 'center',
                  padding: '0 clamp(24px, 8vw, 60px)',
                  lineHeight: 1.6,
                  opacity: hoveredBox === index ? 1 : 0,
                  transition: 'opacity 0.6s ease 0.3s',
                  zIndex: 3,
                  maxWidth: '90%'
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      );
    }

    const currentItem = gridItems.find((item) => item.id === currentPage);
    const pageCopy = getPageContent(currentPage);

    if (currentPage === 'video') {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 5vw, 48px)', position: 'relative' }}>
          <button onClick={() => setCurrentPage('home')} style={{ position: 'absolute', top: 'clamp(16px, 3vw, 32px)', left: 'clamp(16px, 3vw, 32px)', background: 'none', border: 'none', cursor: 'pointer', zIndex: 50 }}>
            <div style={{ position: 'relative', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)' }}>
              {renderDots(windowWidth < 640 ? 35 : 55, windowWidth < 640 ? 6 : 8, '#ffffff', 1)}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', color: '#ffffff' }}>Back</div>
            </div>
          </button>

          <div style={{ maxWidth: 1200, width: '100%', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 'bold', color: '#ffffff', marginBottom: 'clamp(24px, 4vw, 40px)' }}>Welcome to Work Collective</h1>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,166,232,0.3)' }}>
              <iframe 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube.com/embed/mBJ54tKrInM"
                title="Work Collective Welcome Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#e0e0e0', marginTop: 'clamp(24px, 4vw, 40px)', lineHeight: 1.7, padding: '0 16px' }}>
              Discover how God is calling you to redeem your 2,000 hours of work annually as ministry to the world.
            </p>
          </div>
        </div>
      );
    }

    if (currentPage === 'testimonies') {
      const testimonials = [
        { id: 0, name: 'Sarah Mitchell', role: 'Healthcare Executive', quote: 'Work Collective transformed how I view my calling in healthcare. I now see every patient interaction as ministry.' },
        { id: 1, name: 'David Chen', role: 'Software Engineer', quote: 'This cohort helped me integrate my faith into my daily work. I am now mentoring others in redemptive entrepreneurship.' },
        { id: 2, name: 'Maria Rodriguez', role: 'Education Administrator', quote: 'The three ways to work framework gave me clarity on how to lead with integrity and purpose in my school.' },
        { id: 3, name: 'James Thompson', role: 'Financial Advisor', quote: 'I learned to steward resources redemptively. My practice now focuses on blessing clients and honoring God.' },
      ];

      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(24px, 5vw, 48px)', position: 'relative' }}>
          <button onClick={() => setCurrentPage('home')} style={{ position: 'absolute', top: 'clamp(16px, 3vw, 32px)', left: 'clamp(16px, 3vw, 32px)', background: 'none', border: 'none', cursor: 'pointer', zIndex: 50 }}>
            <div style={{ position: 'relative', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)' }}>
              {renderDots(windowWidth < 640 ? 35 : 55, windowWidth < 640 ? 6 : 8, '#00A6E8', 1)}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', color: '#00A6E8' }}>Back</div>
            </div>
          </button>
          
          <div style={{ maxWidth: 1200, width: '100%', textAlign: 'center', paddingTop: '80px' }}>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: 16 }}>{pageCopy.title}</h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', color: '#00A6E8', marginBottom: 'clamp(40px, 7vw, 60px)', padding: '0 16px' }}>{pageCopy.content}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 8vw, 80px)', maxWidth: 1000, margin: '0 auto', padding: '0 16px' }}>
              {testimonials.map((t) => (
                <div key={t.id} style={{ display: 'flex', flexDirection: windowWidth >= 768 ? 'row' : 'column', alignItems: 'center', gap: 'clamp(24px, 4vw, 48px)' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: 'clamp(180px, 25vw, 250px)', height: 'clamp(180px, 25vw, 250px)', borderRadius: '50%', background: 'linear-gradient(135deg, #00A6E8 0%, #0080B8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'clamp(56px, 8vw, 80px)', fontWeight: 'bold', boxShadow: '0 8px 24px rgba(0,166,232,0.2)' }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: windowWidth >= 768 ? 'left' : 'center' }}>
                    <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: '8px' }}>{t.name}</h3>
                    <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>{t.role}</p>
                    <p style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: '#333', lineHeight: 1.7 }}>"{t.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 'resources') {
      const resources = [
        { name: 'Module 0: Redemptive Frame Overview', type: 'PDF' },
        { name: 'Module 1: The Exploitative Way', type: 'PDF' },
        { name: 'Module 2: The Ethical Way', type: 'PDF' },
        { name: 'Module 3: The Redemptive Way', type: 'PDF' },
        { name: 'Module 4: Money', type: 'PDF' },
        { name: 'Module 5: Time', type: 'PDF' },
        { name: 'Module 6: Power', type: 'PDF' },
        { name: 'Module 7: Imagination', type: 'PDF' },
        { name: 'Module 8: Decision Making', type: 'PDF' },
        { name: 'Cohort Syllabus', type: 'PDF' },
        { name: 'Personal Playbook Guide', type: 'PDF' },
        { name: 'Welcome Letter', type: 'PDF' },
      ];

      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(24px, 5vw, 48px)', position: 'relative' }}>
          <button onClick={() => setCurrentPage('home')} style={{ position: 'absolute', top: 'clamp(16px, 3vw, 32px)', left: 'clamp(16px, 3vw, 32px)', background: 'none', border: 'none', cursor: 'pointer', zIndex: 50 }}>
            <div style={{ position: 'relative', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)' }}>
              {renderDots(windowWidth < 640 ? 35 : 55, windowWidth < 640 ? 6 : 8, '#00A6E8', 1)}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', color: '#00A6E8' }}>Back</div>
            </div>
          </button>
          
          <div style={{ maxWidth: 900, width: '100%', textAlign: 'center', paddingTop: '80px' }}>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: 16 }}>{pageCopy.title}</h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', color: '#00A6E8', marginBottom: 'clamp(40px, 7vw, 60px)', padding: '0 16px' }}>{pageCopy.content}</p>

            <div style={{ display: 'grid', gap: '16px', maxWidth: 600, margin: '0 auto' }}>
              {resources.map((resource, idx) => (
                <div key={idx} style={{ background: '#f8f9fa', border: '2px solid #00A6E8', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,166,232,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: '4px' }}>{resource.name}</h3>
                    <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', color: '#666' }}>{resource.type}</p>
                  </div>
                  <div style={{ fontSize: '24px' }}>📥</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 'apply') {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(24px, 5vw, 48px)', position: 'relative' }}>
          <button onClick={() => setCurrentPage('home')} style={{ position: 'absolute', top: 'clamp(16px, 3vw, 32px)', left: 'clamp(16px, 3vw, 32px)', background: 'none', border: 'none', cursor: 'pointer', zIndex: 50 }}>
            <div style={{ position: 'relative', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)' }}>
              {renderDots(windowWidth < 640 ? 35 : 55, windowWidth < 640 ? 6 : 8, '#00A6E8', 1)}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 'bold', color: '#00A6E8' }}>Back</div>
            </div>
          </button>
          
          <div style={{ maxWidth: 700, width: '100%', paddingTop: '80px' }}>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: 16, textAlign: 'center' }}>{pageCopy.title}</h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', color: '#00A6E8', marginBottom: 'clamp(40px, 7vw, 60px)', padding: '0 16px', textAlign: 'center' }}>{pageCopy.content}</p>

            <form style={{ background: '#f8f9fa', border: '2px solid #00A6E8', borderRadius: '16px', padding: 'clamp(24px, 4vw, 40px)' }} onSubmit={(e) => { e.preventDefault(); alert('Thank you for applying! We will be in touch soon.'); }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: '8px' }}>Full Name *</label>
                <input type="text" required style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: '8px' }}>Email *</label>
                <input type="email" required style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: '8px' }}>Phone</label>
                <input type="tel" style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: '8px' }}>Current Vocation/Industry *</label>
                <input type="text" required style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 'bold', color: '#00A6E8', marginBottom: '8px' }}>Why do you want to join Work Collective? *</label>
                <textarea required rows={5} style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', fontFamily: 'inherit' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: 'clamp(14px, 1.8vw, 16px)', color: '#333' }}>
                  <input type="checkbox" required style={{ marginRight: '8px', width: '18px', height: '18px' }} />
                  I am a partner of The Austin Stone (or pursuing partnership) *
                </label>
              </div>

              <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #00A6E8 0%, #0080B8 100%)', color: 'white', border: 'none', borderRadius: '50px', fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>Submit Application</button>
            </form>
          </div>
        </div>
      );
    }

    if (currentPage === 'cohort') {
      const modules = [
        { id: 0, name: 'Redemptive Frame Overview', desc: 'Define and explore redemptive possibilities through the three ways to work: exploitative, ethical, and redemptive.' },
        { id: 1, name: 'The Exploitative Way', desc: 'Christians should guard against and reject the exploitative way to work—taking all you can get and winning at all costs.' },
        { id: 2, name: 'The Ethical Way', desc: 'Maintain an ethical posture toward work as baseline—doing things right, playing fair, and seeking win-win collaboration.' },
        { id: 3, name: 'The Redemptive Way', desc: 'By baselining the ethical, we can pursue the redemptive way—creative restoration through sacrifice that blesses others.' },
        { id: 4, name: 'Money', desc: 'Reject serving money as a god, stewarding it instead as a resource for God\'s purposes through generosity and simplicity.' },
        { id: 5, name: 'Time', desc: 'Establish a rhythm of work and rest, embracing Sabbath as God designed us to work and rejecting time famine and hurry.' },
        { id: 6, name: 'Power', desc: 'Rather than accumulating power, steward it to grant others access and opportunity, using authority to bless and serve.' },
        { id: 7, name: 'Imagination', desc: 'By renewing our minds, use our imagination to think creatively and redemptively about our work and calling.' },
        { id: 8, name: 'Decision Making', desc: 'Make vocational decisions in humble dependence on the Lord rather than willful self-reliance and autonomy.' },
        { id: 9, name: 'Community', desc: 'Reject individualism and isolation, pursuing community in our vocation as God designed us to work together.' },
      ];

      return (
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#ffffff', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 'clamp(24px, 5vw, 48px)', 
          position: 'relative' 
        }}>
          <button
            onClick={() => setCurrentPage('home')}
            style={{ 
              position: 'absolute', 
              top: 'clamp(16px, 3vw, 32px)', 
              left: 'clamp(16px, 3vw, 32px)', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              zIndex: 50 
            }}
          >
            <div style={{ position: 'relative', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)' }}>
              {renderDots(windowWidth < 640 ? 35 : 55, windowWidth < 640 ? 6 : 8, '#00A6E8')}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                color: '#00A6E8', 
                fontWeight: 'bold', 
                fontSize: 'clamp(14px, 2vw, 18px)' 
              }}>
                Back
              </div>
            </div>
          </button>

          <div style={{ maxWidth: 1200, width: '100%', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: 'clamp(32px, 6vw, 64px)', 
              fontWeight: 'bold', 
              color: '#00A6E8', 
              marginBottom: 16 
            }}>
              {pageCopy.title}
            </h1>
            <p style={{ 
              fontSize: 'clamp(16px, 2.5vw, 24px)', 
              color: '#00A6E8', 
              marginBottom: 'clamp(24px, 5vw, 48px)',
              padding: '0 16px'
            }}>
              {pageCopy.content}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: windowWidth >= 768 ? 'repeat(2, 1fr)' : '1fr', 
              gap: 16, 
              maxWidth: 900, 
              margin: '0 auto' 
            }}>
              {modules.map((m) => {
                const row = Math.floor(m.id / 2);
                const col = m.id % 2;
                const isBlue = (row + col) % 2 === 0;
                const bg = isBlue ? '#00A6E8' : '#ffffff';
                const fg = isBlue ? '#ffffff' : '#00A6E8';
                const isHovered = hoveredModule === m.id;

                return (
                  <div 
                    key={m.id} 
                    onMouseEnter={() => setHoveredModule(m.id)}
                    onMouseLeave={() => setHoveredModule(null)}
                    style={{ 
                      position: 'relative', 
                      aspectRatio: '1',
                      minHeight: '280px',
                      backgroundColor: bg, 
                      border: `2px solid ${fg}`,
                      perspective: '1000px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0)',
                      transition: 'transform 0.6s'
                    }}>
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: 'clamp(16px, 3vw, 24px)'
                      }}>
                        <div style={{ 
                          position: 'absolute', 
                          top: 'clamp(12px, 2vw, 16px)', 
                          left: 'clamp(12px, 2vw, 16px)', 
                          fontSize: 'clamp(12px, 1.5vw, 14px)', 
                          fontWeight: 700, 
                          color: fg 
                        }}>
                          Module
                        </div>
                        <div style={{ 
                          position: 'absolute', 
                          top: 'clamp(12px, 2vw, 16px)', 
                          right: 'clamp(12px, 2vw, 16px)', 
                          fontSize: 'clamp(12px, 1.5vw, 14px)', 
                          fontWeight: 700, 
                          color: fg 
                        }}>
                          {m.id}
                        </div>
                        <div style={{ 
                          fontSize: 'clamp(20px, 3vw, 28px)', 
                          fontWeight: 800, 
                          color: fg, 
                          textAlign: 'center',
                          padding: '0 8px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.2
                        }}>
                          {m.name}
                        </div>
                      </div>
                      
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 'clamp(24px, 4vw, 32px)',
                        backgroundColor: bg,
                        border: `2px solid ${fg}`
                      }}>
                        <p style={{ 
                          fontSize: 'clamp(14px, 2vw, 18px)', 
                          color: fg, 
                          textAlign: 'center', 
                          lineHeight: 1.5 
                        }}>
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: currentItem?.bgColor || '#00A6E8', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 'clamp(24px, 5vw, 48px)', 
        position: 'relative' 
      }}>
        <button 
          onClick={() => setCurrentPage('home')} 
          style={{ 
            position: 'absolute', 
            top: 'clamp(16px, 3vw, 32px)', 
            left: 'clamp(16px, 3vw, 32px)', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            zIndex: 50 
          }}
        >
          <div style={{ position: 'relative', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)' }}>
            {renderDots(windowWidth < 640 ? 35 : 55, windowWidth < 640 ? 6 : 8, currentItem?.textColor || '#ffffff')}
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              fontSize: 'clamp(14px, 2vw, 18px)', 
              fontWeight: 'bold', 
              color: currentItem?.textColor || '#ffffff' 
            }}>
              Back
            </div>
          </div>
        </button>
        
        <div style={{ maxWidth: 900, width: '100%', textAlign: 'center', padding: '0 16px' }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 6vw, 64px)', 
            fontWeight: 'bold', 
            color: currentItem?.textColor || '#ffffff', 
            marginBottom: 'clamp(16px, 3vw, 32px)' 
          }}>
            {pageCopy.title}
          </h1>
          <p style={{ 
            fontSize: 'clamp(16px, 2.5vw, 24px)', 
            color: currentItem?.textColor || '#ffffff', 
            lineHeight: 1.8 
          }}>
            {pageCopy.content}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', width: '100%', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        {renderPage()}
      </div>
      
      <footer style={{ backgroundColor: '#00A6E8', color: '#ffffff', padding: 'clamp(40px, 6vw, 80px) 0 clamp(20px, 3vw, 30px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth >= 768 ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr', gap: 'clamp(32px, 5vw, 48px)', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
            
            <div>
              <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 'bold', marginBottom: '16px' }}>Work Collective</h3>
              <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.6, opacity: 0.9 }}>
                Equipping ambassadors of Christ to integrate faith and work, redeeming their 2,000 annual work hours as ministry to the world.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 'bold', marginBottom: '16px' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['home', 'vision', 'mission', 'about'].map(page => (
                  <a key={page} onClick={() => setCurrentPage(page)} style={{ color: '#ffffff', opacity: 0.9, fontSize: 'clamp(14px, 1.8vw, 16px)', cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 'bold', marginBottom: '16px' }}>Program</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['cohort', 'apply', 'resources', 'testimonies'].map(page => (
                  <a key={page} onClick={() => setCurrentPage(page)} style={{ color: '#ffffff', opacity: 0.9, fontSize: 'clamp(14px, 1.8vw, 16px)', cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}>
                    {page === 'cohort' ? 'Cohort Overview' : page.charAt(0).toUpperCase() + page.slice(1)}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 'bold', marginBottom: '16px' }}>Contact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'clamp(14px, 1.8vw, 16px)', opacity: 0.9 }}>
                <p>The Austin Stone Community Church</p>
                <p>7300 Woodland Dr</p>
                <p>Austin, TX 78731</p>
                <p style={{ marginTop: '8px' }}>workcollective@austinstone.org</p>
                <p>(512) 383-2323</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 'clamp(20px, 3vw, 30px)', display: 'flex', flexDirection: windowWidth >= 640 ? 'row' : 'column', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: 'clamp(12px, 1.5vw, 14px)', opacity: 0.8 }}>
            <p>© 2025 Work Collective. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>Privacy Policy</a>
              <a href="#" style={{ color: '#ffffff', textDecoration: 'none', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkCollectiveWebsite;