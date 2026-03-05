import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Student Representative</h4>
                <h5>
                  <a href="https://poornima.edu.in/about/eoc/" target="_blank" rel="noopener noreferrer">
                    Equal Opportunity Cell — Poornima University
                  </a>
                </h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Serving as Student Representative at the Equal Opportunity Cell
              (EOC) at Poornima University since April 2025. Working to prevent
              discrimination and promote inclusivity across the campus community.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Social Media Manager</h4>
                <h5><a href="https://arge.in" target="_blank" rel="noopener noreferrer">arge.in</a></h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Full-time remote role at arge.in managing social media accounts
              and backend website work. Handling online graphics, content
              strategy, and Shopify site updates.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Team Leader — Marketing</h4>
                <h5><a href="https://aiesec.in" target="_blank" rel="noopener noreferrer">AIESEC in India</a></h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading the Marketing team at AIESEC in India since February
              2026. Building leadership capacity and driving the organization's
              marketing strategy. Previously completed a Global Volunteer
              Program internship with AIESEC in Egypt (Jun–Jul 2025).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
