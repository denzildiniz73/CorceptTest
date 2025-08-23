"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "@/app/share-your-story/share-your-story.css";

export default function ShareYourStoryPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = OnPageLoad, 1 = Personal Details, 2 = Recording, 3 = Thank You
  const [subStep, setSubStep] = useState(null); // For sub-states like 2.1, 2.2, etc.
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [hasStoppedRecording, setHasStoppedRecording] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [uploadError, setUploadError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attribution: "named",
    relation: "",
    platinumResistant: "",
    consent: false,
    contactOptIn: false,
  });

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const playbackIntervalRef = useRef(null);

  // Available tags for flower generation
  const availableTags = [
    "Strong", "Resilient", "Hopeful", "Brave", "Determined", "Inspiring", 
    "Caring", "Peaceful", "Vibrant", "Gentle", "Fierce", "Graceful"
  ];

  // Available flowers (assuming these exist in /public/images/flowers/)
  const availableFlowers = [
    "rose.svg", "sunflower.svg", "lily.svg", "orchid.svg", "tulip.svg", 
    "daisy.svg", "iris.svg", "peony.svg", "jasmine.svg", "lavender.svg"
  ];

  // Flower generation algorithm
  const generateFlower = (tags) => {
    if (tags.length === 0) return null;
    const tagString = tags.sort().join('');
    let hash = 0;
    for (let i = 0; i < tagString.length; i++) {
      const char = tagString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % availableFlowers.length;
    return availableFlowers[index];
  };

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem("shareStoryFormData", JSON.stringify(formData));
  }, [formData]);

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("shareStoryFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  const handleClose = () => {
    // Navigate to home page
    window.location.href = "/";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        setHasStoppedRecording(true);
        setSubStep("2.1.4"); // Go to preview
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      setSubStep("2.1.3"); // Recording in progress

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 90) {
            stopRecording();
            return 90;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setPlaybackTime(0);

      playbackIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setPlaybackTime(audioRef.current.currentTime);
          if (audioRef.current.ended) {
            setIsPlaying(false);
            clearInterval(playbackIntervalRef.current);
          }
        }
      }, 100);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(playbackIntervalRef.current);
    }
  };

  const reRecord = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setIsRecording(false);
    setHasStoppedRecording(false);
    setSubStep("2.1.2"); // Back to start recording
    clearInterval(recordingIntervalRef.current);
    clearInterval(playbackIntervalRef.current);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        setUploadError("Please select an audio file.");
        setSubStep("2.2.2"); // Upload failed
        return;
      }

      // Check file duration (this is a simplified check)
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      
      audio.addEventListener('loadedmetadata', () => {
        if (audio.duration > 90) {
          setUploadError("Recording limit is 90 seconds");
          setSubStep("2.2.2"); // Upload failed
        } else {
          setAudioBlob(file);
          setAudioUrl(URL.createObjectURL(file));
          setHasStoppedRecording(true);
          setUploadError("");
          setSubStep("2.2.3"); // Upload preview
        }
      });
    }
  };

  const handleFormSubmit = () => {
    // Final form submission
    console.log("Form submitted:", { formData, selectedTags, audioBlob });
    setCurrentStep(3); // Go to thank you page
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressBarClass = () => {
    if (currentStep === 0) return "onpage-load"; // All white
    if (currentStep === 1) return "step-1"; // First circle active, gradient to second
    if (currentStep === 2 && !subStep) return "step-2"; // First circle complete, second active, gradient to third
    if (currentStep === 2 && (subStep === "2.1.4" || subStep === "2.2.1" || subStep === "2.2.2" || subStep === "2.2.3")) {
      return "step-2-preview"; // First and second complete, third active
    }
    return "step-3"; // All complete
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.consent) errors.consent = 'Consent is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="share-story-container">
      {/* Header */}
      <div className="story-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-text">Illuminate HOPE</span>
            <span className="divider">|</span>
            <span className="page-title">Share your story</span>
          </div>
          <button className="close-button" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#C25968"
                strokeWidth="2"
                strokeLinecap="round"
              /> 
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className={`progress-bar ${getProgressBarClass()}`}>
          <div className="progress-step">
            <div
              className={`step-circle ${
                currentStep >= 2
                  ? "completed"
                  : currentStep >= 1
                  ? "active"
                  : ""
              }`}
            >
              {currentStep >= 2 ? "✓" : ""}
            </div>
            <span className="step-label">About you</span>
          </div>
          <div className="progress-step">
            <div
              className={`step-circle ${
                (currentStep === 2 && (subStep === "2.1.4" || subStep === "2.2.1" || subStep === "2.2.2" || subStep === "2.2.3")) || currentStep >= 3
                  ? "completed"
                  : currentStep >= 2
                  ? "active"
                  : ""
              }`}
            >
              {(currentStep === 2 && (subStep === "2.1.4" || subStep === "2.2.1" || subStep === "2.2.2" || subStep === "2.2.3")) || currentStep >= 3 ? "✓" : ""}
            </div>
            <span className="step-label">Share your story</span>
          </div>
          <div className="progress-step">
            <div
              className={`step-circle ${
                currentStep >= 3
                  ? "completed"
                  : (currentStep === 2 && (subStep === "2.1.4" || subStep === "2.2.1" || subStep === "2.2.2" || subStep === "2.2.3"))
                  ? "active"
                  : ""
              }`}
            >
              {currentStep >= 3 ? "✓" : ""}
            </div>
            <span className="step-label">Submit Illumination</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-card">
          {/* OnPageLoad: Initial State */}
          {currentStep === 0 && (
            <div className="step-content">
              <h2 className="step-title">A quick note before you share</h2>
              <div className="note-content">
                <ul className="note-list">
                  <li>
                    We will review and potentially revise submissions for
                    appropriateness before use
                  </li>
                  <li>Not every submission will be chosen to be shared</li>
                  <li>
                    You can choose your submission to be anonymous or to add
                    your first name
                  </li>
                  <li>
                    To respect the privacy of others, we kindly ask that you
                    submit only your own story. If you are a loved one of
                    someone with platinum-resistant ovarian cancer, please
                    submit only your personal experience
                  </li>
                </ul>
              </div>
              <div className="step-actions">
                <button className="continue-btn" onClick={() => setCurrentStep(1)}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Personal Details Form */}
          {currentStep === 1 && (
            <div className="step-content">
              <h2 className="step-title">Tell us about yourself</h2>
              <form className="personal-details-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Jane"
                      className={formErrors.name ? 'error' : ''}
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="janedoe@email.com"
                      className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="form-section">
                  <h4>Describe Yourself to Generate a Unique Flower</h4>
                  <p className="form-description">Select up to 3 tags that best describe you:</p>
                  <div className="tags-container">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else if (selectedTags.length < 3) {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                        disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="flower-preview">
                      <p>Your unique flower:</p>
                      <div className="flower-display">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={`/images/flowers/${generateFlower(selectedTags)}`} 
                          alt="Your unique flower"
                          onError={(e) => {e.target.style.display = 'none'}}
                        />
                        <span className="flower-name">{generateFlower(selectedTags)?.replace('.svg', '').replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-section">
                  <h4>Attribution preference</h4>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="attribution"
                        value="named"
                        checked={formData.attribution === "named"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            attribution: e.target.value,
                          }))
                        }
                      />
                      <span className="checkmark"></span>
                      Yes, I&apos;d like to use my name alongside my Illumination
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="attribution"
                        value="anonymous"
                        checked={formData.attribution === "anonymous"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            attribution: e.target.value,
                          }))
                        }
                      />
                      <span className="checkmark"></span>
                      No thanks, I&apos;d prefer my Illumination to remain anonymous
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Please describe yourself</h4>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="relation"
                        value="patient"
                        checked={formData.relation === "patient"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            relation: e.target.value,
                          }))
                        }
                      />
                      <span className="checkmark"></span>I am a patient with
                      ovarian cancer
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="relation"
                        value="loved-one"
                        checked={formData.relation === "loved-one"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            relation: e.target.value,
                          }))
                        }
                      />
                      <span className="checkmark"></span>
                      Someone I love is a patient with ovarian cancer
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h4>
                    Has a healthcare professional told you that your/your loved
                    one&apos;s ovarian cancer has become platinum resistant?
                  </h4>
                  <div className="radio-group horizontal">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="platinumResistant"
                        value="yes"
                        checked={formData.platinumResistant === "yes"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            platinumResistant: e.target.value,
                          }))
                        }
                      />
                      <span className="checkmark"></span>
                      Yes
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="platinumResistant"
                        value="no"
                        checked={formData.platinumResistant === "no"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            platinumResistant: e.target.value,
                          }))
                        }
                      />
                      <span className="checkmark"></span>
                      No
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="platinumResistant"
                        value="not-sure"
                        checked={formData.platinumResistant === "not-sure"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            platinumResistant: e.target.value,
                          }))
                        }
                      />
                      <span className="checkmark"></span>
                      I&apos;m not sure
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          consent: e.target.checked,
                        }))
                      }
                    />
                    <span className="checkmark"></span>I confirm I am 18 years
                    or older, a US resident, and acknowledge that I hereby
                    consent and authorize Corcept Therapeutics to use my
                    likeness in any digital media (&quot;Audio&quot;) that I submitted
                    above and agree to the full terms and conditions of the
                    Audio Release.
                  </label>
                  {formErrors.consent && <span className="error-message">{formErrors.consent}</span>}
                </div>

                <div className="form-section">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.contactOptIn}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactOptIn: e.target.checked,
                        }))
                      }
                    />
                    <span className="checkmark"></span>
                    I&apos;m interested in being contacted by Corcept for additional
                    opportunities to share my story. (Optional)
                  </label>
                </div>

                <div className="privacy-notice">
                  <p>
                    For more information regarding how we process, share, and
                    protect your personal information, please read our{" "}
                    <a href="#" className="privacy-link">
                      Privacy Notice.
                    </a>
                  </p>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setCurrentStep(0)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={() => {
                      if (validateForm()) {
                        setCurrentStep(2);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Recording Options */}
          {currentStep === 2 && !subStep && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              <p className="step-description">Choose how you&apos;d like to share your story with us:</p>
              
              <div className="recording-options">
                <div 
                  className="option-card"
                  onClick={() => setSubStep("2.1.2")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/Audio-recorder/Audio rercord state Default.svg" 
                    alt="Record audio"
                    className="option-svg"
                  />
                </div>
                
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="upload-option-file"
                />
                <label 
                  htmlFor="upload-option-file"
                  className="option-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/Audio-recorder/Audio Upload state Default.svg" 
                    alt="Upload recording"
                    className="option-svg"
                  />
                </label>
              </div>
              
              <div className="recording-info">
                <p><strong>Please note:</strong></p>
                <ul>
                  <li>Maximum recording length: 90 seconds</li>
                  <li>Accepted file types: MP3, WAV, M4A</li>
                  <li>We may need to access your microphone for recording</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2.1.2: Start Recording */}
          {currentStep === 2 && subStep === "2.1.2" && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              
              <div className="recording-card">
                <h3 className="recording-card-title">Click to start recording</h3>
                <button className="record-start-btn" onClick={startRecording}>
                  <div className="record-dot"></div>
                </button>
                <p className="max-length">Max length: 90 seconds</p>
              </div>

              <div className="recording-tip">
                <p><strong>Tip:</strong> Speak slowly and clearly. Let your story resonate.</p>
                <p>For more tips, <a href="#" className="tip-link">click here</a>.</p>
              </div>

              <p className="upload-alternative">
                <a href="#" onClick={() => setSubStep(null)}>
                  ← Back to options
                </a>
              </p>
            </div>
          )}

          {/* Step 2.1.3: Recording in Progress */}
          {currentStep === 2 && subStep === "2.1.3" && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              
              <div className="recording-card active">
                <h3 className="recording-card-title">Recording...</h3>
                <div className="waveform-container">
                  <div className="waveform">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                  </div>
                </div>
                <div className="recording-timeline">
                  <div className="timeline-track">
                    <div 
                      className="timeline-progress recording" 
                      style={{width: `${(recordingTime / 90) * 100}%`}}
                    ></div>
                  </div>
                  <div className="time-display">
                    <span className="current-time">{formatTime(recordingTime)}</span>
                    <span className="max-time">01:30</span>
                  </div>
                </div>
                <button className="record-stop-btn" onClick={stopRecording}>
                  <div className="stop-icon"></div>
                </button>
              </div>

              <div className="recording-actions">
                <button className="secondary-btn" onClick={reRecord}>
                  Re-record
                </button>
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleFormSubmit}
                  disabled={!hasStoppedRecording}
                >
                  Submit
                </button>
              </div>

              <p className="upload-alternative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="audio-upload-direct"
                />
                <label htmlFor="audio-upload-direct" className="upload-link">
                  Upload a recording instead ↓
                </label>
              </p>
            </div>
          )}

          {/* Step 2.1.4: Recording Preview */}
          {currentStep === 2 && subStep === "2.1.4" && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              
              <div className="recording-card preview">
                <h3 className="recording-card-title">Preview recording</h3>
                {audioUrl && (
                  <>
                    <audio ref={audioRef} src={audioUrl} />
                    <div className="audio-timeline-container">
                      <div className="audio-timeline">
                        <div 
                          className="timeline-progress" 
                          style={{width: `${(playbackTime / (audioRef.current?.duration || 1)) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    <button
                      className="play-btn"
                      onClick={isPlaying ? pauseAudio : playAudio}
                    >
                      <div className="play-icon">{isPlaying ? "⏸" : "▶"}</div>
                    </button>
                  </>
                )}
              </div>

              <div className="recording-actions">
                <button className="secondary-btn" onClick={reRecord}>
                  Re-record
                </button>
                <button
                  type="button"
                  className="submit-btn active"
                  onClick={handleFormSubmit}
                  disabled={!hasStoppedRecording}
                >
                  Submit
                </button>
              </div>

              <p className="upload-alternative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="audio-upload-direct-preview"
                />
                <label htmlFor="audio-upload-direct-preview" className="upload-link">
                  Upload a recording instead ↓
                </label>
              </p>
            </div>
          )}



          {/* Step 2.2.2: Upload Failed */}
          {currentStep === 2 && subStep === "2.2.2" && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              
              <div className="recording-card error">
                <h3 className="recording-card-title">Recording upload failed</h3>
                <div className="error-message">
                  <p>Recording limit is 90 seconds</p>
                </div>
                <div className="upload-area">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="audio-upload-retry"
                  />
                  <label htmlFor="audio-upload-retry" className="upload-button retry">
                    <div className="upload-icon">🔄</div>
                    <span>Try Again</span>
                  </label>
                </div>
              </div>

              <div className="recording-tip">
                <p><strong>Tip:</strong> Make sure your file is an audio file (MP3, WAV, M4A) and under 90 seconds.</p>
              </div>

              <div className="recording-actions">
                <button className="secondary-btn" onClick={() => setSubStep(null)}>
                  Back to options
                </button>
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleFormSubmit}
                  disabled={!hasStoppedRecording}
                >
                  Submit
                </button>
              </div>

              <p className="upload-alternative">
                <a href="#" className="upload-link" onClick={() => setSubStep("2.1.2")}>
                  Record instead ↓
                </a>
              </p>
            </div>
          )}

          {/* Step 2.2.3: Upload Preview */}
          {currentStep === 2 && subStep === "2.2.3" && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              
              <div className="recording-card preview">
                <h3 className="recording-card-title">Preview recording</h3>
                {audioUrl && (
                  <>
                    <audio ref={audioRef} src={audioUrl} />
                    <div className="audio-timeline-container">
                      <div className="audio-timeline">
                        <div 
                          className="timeline-progress" 
                          style={{width: `${(playbackTime / (audioRef.current?.duration || 1)) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    <button
                      className="play-btn"
                      onClick={isPlaying ? pauseAudio : playAudio}
                    >
                      <div className="play-icon">{isPlaying ? "⏸" : "▶"}</div>
                    </button>
                  </>
                )}
              </div>

              <div className="recording-actions">
                <button className="secondary-btn" onClick={() => setSubStep("2.2.1")}>
                  Re-upload
                </button>
                <button
                  type="button"
                  className="submit-btn active"
                  onClick={handleFormSubmit}
                  disabled={!hasStoppedRecording}
                >
                  Submit
                </button>
              </div>

              <p className="upload-alternative">
                <a href="#" className="upload-link" onClick={() => setSubStep("2.1.2")}>
                  Record instead ↓
                </a>
              </p>
            </div>
          )}

          {/* Step 3: Thank You */}
          {currentStep === 3 && (
            <div className="step-content">
              <h2 className="step-title">Thank you for sharing your story!</h2>
              <div className="thank-you-content">
                <p>
                  Your story has been submitted and will be reviewed by our team.
                  We appreciate you taking the time to share your experience with us.
                </p>
                <p>
                  Your voice matters and helps bring hope to others facing similar challenges.
                </p>
              </div>
              <div className="step-actions">
                <Link href="/" className="continue-btn">
                  Back to IlluminateHope
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
