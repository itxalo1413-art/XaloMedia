import './index.css';
const Navbar = () => (<header className="navbar">
    <div className="container flex-between">
      <div className="logo">
        <span className="logo-text">xalo<span style={{ color: '#5BC0F8' }}>media</span></span>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="#home">TRANG CHỦ</a></li>
          <li><a href="#services">DỊCH VỤ</a></li>
          <li><a href="#kol">KOL | KOC</a></li>
          <li><a href="#casestudy">CASE STUDY</a></li>
          <li><a href="#contact" className="btn btn-primary" style={{ color: '#0081C9' }}>CONTACT</a></li>
        </ul>
      </nav>
    </div>
  </header>);
const Hero = () => (<section className="hero" id="home">
    <div className="container text-center">
      <h1 className="hero-title">Heading</h1>
      <p className="hero-subtitle">Sub Heading<br />Sub Heading</p>
      <button className="btn btn-primary">Join With Us &rarr;</button>
    </div>
  </section>);
const About = () => (<section className="about" id="about">
    <div className="container">
      <h2 className="section-title text-blue" style={{ textAlign: 'center' }}>About Us</h2>
      <div className="about-grid">
        <div className="about-content">
          <h3 className="heading-large">Heading</h3>
          <p className="text-muted">Sub Heading</p>
          <p className="text-muted">Sub Heading</p>
        </div>
        <div className="about-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>Heading</h4>
            <div style={{ width: '60px', height: '1px', backgroundColor: '#888', marginTop: '10px' }}></div>
          </div>
          <p className="card-desc" style={{ fontSize: '0.875rem', color: '#666', marginTop: '10px' }}>Sub Heading</p>
          <p className="card-desc" style={{ fontSize: '0.875rem', color: '#666' }}>Sub Heading</p>
          
          <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
             <h4 style={{ fontSize: '0.875rem' }}>By whom?</h4>
             <p style={{ fontSize: '0.75rem', color: '#888' }}>Sub Heading</p>
          </div>
        </div>
      </div>
    </div>
  </section>);
const Stats = () => (<section className="stats">
        <div className="container">
            <div className="stats-grid">
                <div>
                   <p style={{ fontWeight: 700 }}>Mang lưới KOLs, KOCs lớn nhất</p>
                   <h2 className="stat-number">10,000+</h2>
                </div>
                <div>
                    <h3 style={{ fontSize: '1.5rem' }}>Heading</h3>
                    <p className="text-muted">Sub Heading<br />Sub Heading</p>
                    <button className="btn btn-accent" style={{ marginTop: '20px' }}>Read more</button>
                </div>
            </div>
        </div>
    </section>);
const Clients = () => (<section className="clients">
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Our Client</h2>
                <p style={{ color: '#888', maxWidth: '200px', textAlign: 'right', fontSize: '0.8rem' }}>The description about the client that we have cooperated.</p>
            </div>
            <div className="clients-layout">
                {[1, 2, 3, 4, 5, 6].map(i => (<div key={i} className="client-box"></div>))}
            </div>
        </div>
    </section>);
const Services = () => (<section className="our-services" id="services">
        <div className="container">
            <h2 className="services-title">OUR SERVICES</h2>
            
            <div className="services-main-grid">
                <div className="service-big-card">
                    <div className="service-img-placeholder studio"></div>
                    <h3 className="service-card-title">Setup Livestream</h3>
                </div>
                
                <div className="service-big-card">
                    <div className="service-img-placeholder kols"></div>
                    <h3 className="service-card-title">Booking KOCs, KOLs</h3>
                </div>

                <div className="service-big-card">
                    <div className="service-img-placeholder awareness"></div>
                    <h3 className="service-card-title">Brand Awareness</h3>
                </div>

                <div className="service-big-card">
                    <div className="service-img-placeholder rejuvenation"></div>
                    <h3 className="service-card-title">Brand Rejuvenation</h3>
                </div>
            </div>

            <div className="text-center" style={{ marginTop: '40px' }}>
                <button className="btn-see-more">
                    Xem thêm dịch vụ của chúng tôi ▾
                </button>
            </div>
        </div>
    </section>);
const CaseStudies = () => (<section id="casestudy" style={{ paddingBottom: '100px' }}>
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem' }}>Case studies</h2>
                <a href="#" style={{ color: '#0081C9' }}>See more case studies &rarr;</a>
            </div>
            <div className="case-studies-grid">
                <div className="case-card">
                    <div className="case-image"></div>
                    <div className="case-info">
                        <h3>Title</h3>
                        <p className="text-muted" style={{ margin: '20px 0' }}>Brief description about your case study that you have provided to clients.</p>
                        <a href="#" style={{ color: '#0081C9', fontWeight: 600 }}>Read more &rarr;</a>
                    </div>
                </div>
                <div className="case-card" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                    <div className="case-info">
                        <h3>Title</h3>
                        <p className="text-muted" style={{ margin: '20px 0' }}>Brief description about your case study that you have provided to clients.</p>
                        <a href="#" style={{ color: '#0081C9', fontWeight: 600 }}>Read more &rarr;</a>
                    </div>
                    <div className="case-image"></div>
                </div>
            </div>
        </div>
    </section>);
const ContactHighlight = () => (<div className="container">
        <div className="contact-highlight">
            <h2>Contact Us!</h2>
            <p className="text-muted" style={{ marginBottom: '30px' }}>Brief description about your premium contact provided to clients.</p>
            <button className="btn btn-accent" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Send a message for us</button>
            <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.1, fontSize: '4rem' }}>{"<<<"}</div>
            <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.1, fontSize: '4rem' }}>{">>>"}</div>
        </div>
    </div>);
const Footer = () => (<footer className="footer-custom">
    <div className="footer-rect">
      <div className="footer-logo-group">
        <div className="footer-logo-img"></div>
        <span className="footer-logo-text">xalo.media</span>
      </div>

      <div className="footer-agency-title">Digital Marketing Agency</div>
      <p className="footer-description">
        Đối tác marketing số đáng tin cậy với hơn 2000 KOLs/KOCs và 100+ talents chuyên nghiệp. Chúng tôi giúp thương hiệu kết nối với khách hàng thông qua các giải pháp marketing hiệu quả.
      </p>

      <div className="footer-main-links">
        <div className="footer-link-col">
          <div className="footer-col-title">Dịch vụ</div>
          <ul className="footer-list">
            <li>Influencer Marketing</li>
            <li>TikTok Management</li>
            <li>Livestream Services</li>
            <li>Talent Booking</li>
            <li>Content Creation</li>
            <li>Brand Partnership</li>
          </ul>
        </div>

        <div className="footer-link-col">
          <div className="footer-col-title">Về Xa Lộ</div>
          <ul className="footer-list">
            <li>About Us</li>
            <li>Case Studies</li>
            <li>Network KOLs</li>
            <li>Tuyển dụng</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        <div className="footer-link-col" style={{ gridColumn: 'span 1' }}>
            <div className="footer-col-title">Thông tin Liên hệ</div>
            <ul className="footer-list">
                <li>078 668 8149</li>
                <li>xalo@gmail.com</li>
                <li style={{ lineHeight: '1.2' }}>250 Nguyễn Đình Chính, Phường Phú Nhuận, Thành Phố Hồ Chí Minh</li>
            </ul>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom-bar">
        <div className="footer-copyright">
          Copyright© 2026 XaloMedia. All Rights Reserved
          <span className="footer-bar-divider"></span>
          <span className="footer-legal">Terms of Use</span>
          <span className="footer-legal" style={{ marginLeft: '113px' }}>Privacy Policy</span>
        </div>
        <div className="footer-socials">
          <div className="social-icon fb"></div>
          <div className="social-icon tw"></div>
          <div className="social-icon ig"></div>
        </div>
      </div>
    </div>
  </footer>);
function App() {
    return (<div className="app" style={{ position: 'relative', minHeight: '100vh', paddingBottom: '460px' }}>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Clients />
      <CaseStudies />
      <ContactHighlight />
      <Footer />
      
      
      <div className="floating-buttons">
        <a href="tel:0786688149" className="float-btn phone">
           <div className="icon-phone"></div>
        </a>
        <a href="#" className="float-btn zalo">
           <div className="icon-zalo"></div>
        </a>
      </div>
    </div>);
}
export default App;
//# sourceMappingURL=App.js.map