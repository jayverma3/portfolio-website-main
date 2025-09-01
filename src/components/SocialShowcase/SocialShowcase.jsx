import React, { useState, useMemo } from 'react';
import './SocialShowcase.css';
import showcaseData from '../../data/showcaseData.json';
import ImageSlider from '../ImageSlider/ImageSlider';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_VISIBLE_ITEMS = 3;

const SocialShowcase = () => {
  const [activeTab, setActiveTab] = useState('social');
  const [socialFilter, setSocialFilter] = useState('all');
  const [visibleCounts, setVisibleCounts] = useState({
    social: INITIAL_VISIBLE_ITEMS,
    logo: INITIAL_VISIBLE_ITEMS,
    ui: INITIAL_VISIBLE_ITEMS,
  });
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredSocialPosts = useMemo(() => {
    if (socialFilter === 'all') {
      return showcaseData.socialPosts;
    }
    return showcaseData.socialPosts.filter((post) => post.type === socialFilter);
  }, [socialFilter]);

  const handleLoadMore = (tab) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [tab]: prev[tab] + INITIAL_VISIBLE_ITEMS,
    }));
  };

  const renderSocialPosts = () => (
    <>
      <div className="filter-buttons">
        <button onClick={() => setSocialFilter('all')} className={socialFilter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setSocialFilter('image')} className={socialFilter === 'image' ? 'active' : ''}>Images</button>
        <button onClick={() => setSocialFilter('video')} className={socialFilter === 'video' ? 'active' : ''}>Videos</button>
        <button onClick={() => setSocialFilter('carousel')} className={socialFilter === 'carousel' ? 'active' : ''}>Carousels</button>
      </div>
      <div className="showcase-grid">
        {filteredSocialPosts.slice(0, visibleCounts.social).map((post) => (
          <motion.div
            className="showcase-item"
            key={post.id}
            onClick={() => setSelectedPost(post)}
            whileHover={{ scale: 1.05 }}
            layoutId={post.id}
          >
            {post.type === 'video' ? (
              <video src={post.thumbnail} className="showcase-thumbnail" loop muted autoPlay />
            ) : (
              <img src={post.thumbnail} alt="social post" className="showcase-thumbnail" />
            )}
            <div className="showcase-overlay"><p>View Post</p></div>
          </motion.div>
        ))}
      </div>
      {visibleCounts.social < filteredSocialPosts.length && (
        <button className="load-more-btn" onClick={() => handleLoadMore('social')}>Load More</button>
      )}
    </>
  );

  const renderLogoDesigns = () => (
    <>
      <div className="showcase-grid">
        {showcaseData.logoDesigns.slice(0, visibleCounts.logo).map((logo) => (
          <motion.div className="showcase-item logo-item" key={logo.id} whileHover={{ scale: 1.05 }}>
            <img src={logo.imageUrl} alt={logo.title} className="showcase-logo" />
            <div className="logo-info">
              <h4>{logo.title}</h4>
              <p>{logo.description}</p>
              <span className="logo-year">{logo.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {visibleCounts.logo < showcaseData.logoDesigns.length && (
        <button className="load-more-btn" onClick={() => handleLoadMore('logo')}>Load More</button>
      )}
    </>
  );

  const renderUiDesigns = () => (
    <>
      <div className="showcase-grid">
        {showcaseData.uiDesigns.slice(0, visibleCounts.ui).map((ui) => (
          <motion.div className="showcase-item ui-item" key={ui.id} whileHover={{ scale: 1.05 }}>
            <img src={ui.imageUrl} alt={ui.title} className="showcase-thumbnail" />
            <div className="ui-info">
              <h4>{ui.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>
      {visibleCounts.ui < showcaseData.uiDesigns.length && (
        <button className="load-more-btn" onClick={() => handleLoadMore('ui')}>Load More</button>
      )}
    </>
  );

  return (
    <div className="showcase-container">
      <h2 className="showcase-title">My Creative Work</h2>
      <div className="showcase-tabs">
        <button onClick={() => setActiveTab('social')} className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}>Social Media</button>
        <button onClick={() => setActiveTab('logo')} className={`tab-btn ${activeTab === 'logo' ? 'active' : ''}`}>Logo Designs</button>
        <button onClick={() => setActiveTab('ui')} className={`tab-btn ${activeTab === 'ui' ? 'active' : ''}`}>UI/UX Designs</button>
      </div>

      <div className="showcase-content">
        {activeTab === 'social' && renderSocialPosts()}
        {activeTab === 'logo' && renderLogoDesigns()}
        {activeTab === 'ui' && renderUiDesigns()}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div className="modal-backdrop" onClick={() => setSelectedPost(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} layoutId={selectedPost.id}>
              <div className="modal-slider-container">
                {selectedPost.type === 'video' ? (
                  <video src={selectedPost.media[0]} className="modal-video" controls autoPlay loop />
                ) : (
                  <ImageSlider images={selectedPost.media} />
                )}
              </div>
              <div className="modal-info">
                <div className="modal-user">
                  <img src={selectedPost.user.avatar} alt="avatar" className="modal-avatar" />
                  <div>
                    <p className="modal-username">{selectedPost.user.name}</p>
                    <p className="modal-date">{selectedPost.date}</p>
                  </div>
                </div>
                <p className="modal-caption">{selectedPost.caption}</p>
                <div className="modal-stats">
                  <span>❤️ {selectedPost.likes}</span>
                  <span>💬 {selectedPost.comments}</span>
                  <span>🔗 {selectedPost.shares}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShowcase;