"use client";
import React, { useState, useRef, useEffect } from "react";
import "@/app/share-your-story/share-your-story.css";

export default function ShareYourStoryPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attribution: "named",
    relation: "patient",
    platinumResistant: "",
    consent: false,
    contactOptIn: false,
  });

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const playbackIntervalRef = useRef(null);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem("shareStoryFormData", JSON.stringify(formData));
  }, [formData]);

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("shareStoryFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleClose = () => {
    window.location.href = "/";
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 8));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = () => {
    // Handle file upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/mp3,audio/wav";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file && file.size <= 10 * 1024 * 1024) {
        // 10MB limit
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        setAudioBlob(file);
        setCurrentStep(6); // Go to preview step
      } else {
        alert("File size must be under 10MB");
      }
    };
    input.click();
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
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        setCurrentStep(6); // Go to preview step
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      setCurrentStep(5); // Go to recording active step

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 90) {
            // 1:30 max
            stopRecording();
            return 90;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Error accessing microphone. Please check your permissions.");
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

      playbackIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setPlaybackTime(audioRef.current.currentTime);
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
    setCurrentStep(4);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email || !formData.consent) {
      alert("Please fill in all required fields and accept the terms.");
      return;
    }

    // Here you would typically submit to your backend
    console.log("Form submitted:", formData);
    console.log("Audio blob:", audioBlob);

    setCurrentStep(8);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressBarClass = () => {
    if (currentStep <= 2) return "step-1-2";
    if (currentStep <= 6) return "step-3-7";
    if (currentStep === 7) return "step-8";
    return "step-9";
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
                currentStep >= 3
                  ? "completed"
                  : currentStep >= 1
                  ? "active"
                  : ""
              }`}
            >
              {currentStep >= 3 ? "✓" : ""}
            </div>
            <span className="step-label">Getting started</span>
          </div>
          <div className="progress-step">
            <div
              className={`step-circle ${
                currentStep >= 7
                  ? "completed"
                  : currentStep >= 3
                  ? "active"
                  : ""
              }`}
            >
              {currentStep >= 7 ? "✓" : ""}
            </div>
            <span className="step-label">Share your story</span>
          </div>
          <div className="progress-step">
            <div
              className={`step-circle ${
                currentStep >= 8
                  ? "completed"
                  : currentStep >= 7
                  ? "active"
                  : ""
              }`}
            >
              {currentStep >= 8 ? "✓" : ""}
            </div>
            <span className="step-label">Personal details</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-card">
          {/* Step 1: Quick Note */}
          {currentStep === 1 && (
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
                <button className="continue-btn" onClick={nextStep}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {currentStep === 2 && (
            <div className="step-content">
              <h2 className="step-title">Tell us about yourself</h2>
              <form className="personal-details-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
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
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
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
                    />
                  </div>
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
                      Yes, I'd like to use my name alongside my Illumination
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
                      No thanks, I'd prefer my Illumination to remain anonymous
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
                    one's ovarian cancer has become platinum resistant?
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
                      I'm not sure
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
                    likeness in any digital media ("Audio") that I submitted
                    above and agree to the full terms and conditions of the
                    Audio Release.
                  </label>
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
                    I'm interested in being contacted by Corcept for additional
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
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="continue-btn"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Recording Options */}
          {currentStep === 3 && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              <div className="options-container">
                <div className="option-card" onClick={() => setCurrentStep(4)}>
                  <div className="option-icon">🎤</div>
                  <h3>Record audio</h3>
                  <p>You will be asked to grant microphone permissions.</p>
                </div>
                <div className="option-card" onClick={handleFileUpload}>
                  <div className="option-icon">📁</div>
                  <h3>Upload recording</h3>
                  <p>
                    Supported file types: MP3, WAV
                    <br />
                    Max file size: 10 MB
                  </p>
                </div>
              </div>
              <div className="tip-section">
                <p>
                  <strong>Tip:</strong> Speak slowly and clearly. Let your story
                  resonate.
                </p>
                <p>
                  For more tips,{" "}
                  <a href="#" className="tip-link">
                    click here.
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Click to Start Recording */}
          {currentStep === 4 && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              <div className="recording-area">
                <div className="recording-placeholder">
                  <div className="record-button" onClick={startRecording}>
                    <span>Click to start recording</span>
                    <div className="record-circle">
                      <div className="record-dot"></div>
                    </div>
                  </div>
                </div>
                <p className="recording-info">
                  Max length: 1 minute 30 seconds
                </p>
              </div>
              <div className="tip-section">
                <p>
                  <strong>Tip:</strong> Speak slowly and clearly. Let your story
                  resonate.
                </p>
                <p>
                  For more tips,{" "}
                  <a href="#" className="tip-link">
                    click here.
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Recording Active */}
          {currentStep === 5 && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              <div className="recording-interface">
                <div className="recording-display active">
                  <h3>Recording...</h3>
                  <div className="audio-visualization">
                    <div className="waveform">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="wave-bar"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="time-display">
                    <span>{formatTime(recordingTime)}</span>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${(recordingTime / 90) * 100}%` }}
                      ></div>
                    </div>
                    <span>01:30</span>
                  </div>
                  <button className="record-stop-btn" onClick={stopRecording}>
                    <div className="stop-icon"></div>
                  </button>
                </div>
                <div className="recording-actions">
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={reRecord}>
                      Rerecord
                    </button>
                    <button
                      type="button"
                      className="submit-btn"
                      onClick={handleFormSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <p className="upload-alternative">
                  <a href="#" onClick={() => setCurrentStep(3)}>
                    Upload a recording instead
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Preview Recording */}
          {currentStep === 6 && audioUrl && (
            <div className="step-content">
              <h2 className="step-title">Share your story</h2>
              <div className="preview-interface">
                <div className="preview-display">
                  <h3>Preview Recording</h3>
                  <div className="audio-player">
                    <div className="time-display">
                      <span>{formatTime(playbackTime)}</span>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: audioRef.current
                              ? `${
                                  (playbackTime /
                                    (audioRef.current.duration || 90)) *
                                  100
                                }%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                      <span>01:30</span>
                    </div>
                    <button
                      className="play-pause-btn"
                      onClick={isPlaying ? pauseAudio : playAudio}
                    >
                      {isPlaying ? "⏸️" : "▶️"}
                    </button>
                  </div>
                </div>
                <div className="preview-actions">
                <div className="recording-actions">
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={reRecord}>
                      Rerecord
                    </button>
                    <button
                      type="button"
                      className="submit-btn"
                      onClick={handleFormSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                </div>
                <p className="upload-alternative">
                  <a href="#" onClick={() => setCurrentStep(3)}>
                    Upload a recording instead
                  </a>
                </p>

                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => {
                    setIsPlaying(false);
                    setPlaybackTime(0);
                    clearInterval(playbackIntervalRef.current);
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 8: Thank You */}
          {currentStep === 7 && (
            <div className="step-content thank-you">
              <h2 className="step-title">Thank you for sharing your story</h2>
              <p className="thank-you-message">
                Your words can have an impact on other women with
                platinum-resistant ovarian cancer. We'll let you know if your
                story has been chosen to be shared as an Illumination.
              </p>
              <div className="final-action">
                <a href="/" className="back-home-link">
                  Back to IlluminateHope →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
