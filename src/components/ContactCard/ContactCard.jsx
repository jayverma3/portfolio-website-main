import React, { useState } from "react";
import "./ContactCard.css";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

import GithubIcon from "../../assets/logos_pngs/github-icon.svg";
import LinkedinIcon from "../../assets/logos_pngs/linkedin-icon.svg";
import TwitterIcon from "../../assets/logos_pngs/twitter-icon.svg";

const MAX_NAME_LENGTH = 40;
const MAX_COMMENT_LENGTH = 300;

const ContactCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.comment.trim()) newErrors.comment = "Comment is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("comment", formData.comment);

      await fetch(
        "https://script.google.com/macros/s/AKfycbxCmlJwOWULv5qyI3x2-uZSV37aqiToqj7VR0s-ES0UMX_ibfwkug_uI2tQlOZ07g4U/exec",
        {
          method: "POST",
          body: form,
        }
      );

      setSubmitted(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error("Form submission error:", err);
      setErrors({ form: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="contact-container-genz">
      <motion.div
        className="contact-card-genz"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="contact-info-genz">
          <h2 className="contact-title-genz">Let's Connect</h2>
          <p className="contact-subtitle-genz">
            Have a project in mind or just want to say hi? Drop me a message.
          </p>
          <div className="social-links-genz">
            <a
              href="https://jayverma3.github.io/portfolio-website/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GithubIcon} alt="GitHub" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={LinkedinIcon} alt="LinkedIn" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={TwitterIcon} alt="Twitter" />
            </a>
          </div>
        </div>

        <div className="contact-form-genz">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thankyou"
                className="thankyou-message-genz"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <h3>Thanks for reaching out! 🚀</h3>
                <p>I'll get back to you ASAP.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form-group-genz">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={MAX_NAME_LENGTH}
                    required
                    className={errors.name ? "input-error" : ""}
                  />
                  <label>Name</label>
                  {errors.name && (
                    <span className="error-msg-genz">{errors.name}</span>
                  )}
                </div>

                <div className="form-group-genz">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={errors.email ? "input-error" : ""}
                  />
                  <label>Email</label>
                  {errors.email && (
                    <span className="error-msg-genz">{errors.email}</span>
                  )}
                </div>

                <div className="form-group-genz">
                  <textarea
                    name="comment"
                    placeholder=" "
                    rows="4"
                    value={formData.comment}
                    onChange={handleChange}
                    maxLength={MAX_COMMENT_LENGTH}
                    required
                    className={errors.comment ? "input-error" : ""}
                  />
                  <label>Message</label>
                  {errors.comment && (
                    <span className="error-msg-genz">{errors.comment}</span>
                  )}
                </div>

                {errors.form && (
                  <span className="error-msg-genz form-error">
                    {errors.form}
                  </span>
                )}

                <motion.button
                  type="submit"
                  className="submit-btn-genz"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactCard;
