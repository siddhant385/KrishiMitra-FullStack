import React, { useState } from "react";
import "./Profile.css";

import {
  Camera,
  MapPin,
  Edit3,
  Award,
  TrendingUp,
  Bell,
  Globe,
  Settings,
  HelpCircle,
  Info,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "राम कुमार",
    location: "जबलपुर, मध्य प्रदेश",
    phone: "+91 98765 43210",
    farmArea: "5 एकड़",
    soilType: "काली मिट्टी",
    mainCrop: "गेहूं, सोयाबीन",
    experience: "15 वर्ष",
    premium: true,
  });

  const stats = [
    { id: 1, label: "कुल स्कैन", value: "47", Icon: Camera, colorClass: "icon-blue" },
    { id: 2, label: "सुझाव प्राप्त", value: "23", Icon: HelpCircle, colorClass: "icon-green" },
    { id: 3, label: "पैदावार वृद्धि", value: "+15%", Icon: TrendingUp, colorClass: "icon-orange" },
    { id: 4, label: "पुरस्कार अंक", value: "1,250", Icon: Award, colorClass: "icon-purple" },
  ];

  const achievements = [
    { id: 1, emoji: "🏆", title: "स्मार्ट किसान", desc: "AI सहायक का सफल उपयोग", earned: true },
    { id: 2, emoji: "⭐", title: "नियमित उपयोगकर्ता", desc: "30 दिन लगातार ऐप का उपयोग", earned: true },
    { id: 3, emoji: "🌾", title: "फसल विशेषज्ञ", desc: "50 सफल स्कैन पूरे करें", earned: false },
    { id: 4, emoji: "🤝", title: "समुदायिक सदस्य", desc: "अन्य किसानों की मदद करें", earned: false },
  ];

  function toggleEdit() {
    setIsEditing((s) => !s);
  }
  function onChange(key, value) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  return (
    <div className="pm-page">
      {/* Header */}
      <div className="pm-card pm-header mt-13">
        <div className="pm-header-left">
          <div className="pm-avatar-placeholder">
            <div className="pm-avatar-circle">{profile.name.split(" ")[0]?.[0] || "U"}</div>
            <button className="pm-avatar-change" title="Change photo">
              <Camera size={16} />
            </button>
          </div>

          <div className="pm-meta">
            <div className="pm-name-row">
              <h2 className="pm-name">{profile.name}</h2>
              {profile.premium && <span className="pm-badge">प्रीमियम</span>}
            </div>

            <div className="pm-location">
              <MapPin size={14} className="icon-inline" />
              <span>{profile.location}</span>
            </div>

            <div className="pm-phone">{profile.phone}</div>
          </div>
        </div>

        <div className="pm-header-right">
          <button className="pm-edit-btn" onClick={toggleEdit}>
            <Edit3 size={16} />
            <span style={{ marginLeft: 8 }}>{isEditing ? "Save" : "Edit"}</span>
          </button>
        </div>
      </div>

      {/* Farm details */}
      <div className="pm-card pm-details">
        <h3 className="pm-card-title">खेत का विवरण</h3>
        <div className="pm-details-grid">
          <div className="pm-detail">
            <div className="label">क्षेत्रफल</div>
            {isEditing ? (
              <input className="pm-input" value={profile.farmArea} onChange={(e) => onChange("farmArea", e.target.value)} />
            ) : (
              <div className="value">{profile.farmArea}</div>
            )}
          </div>

          <div className="pm-detail">
            <div className="label">मिट्टी का प्रकार</div>
            {isEditing ? (
              <input className="pm-input" value={profile.soilType} onChange={(e) => onChange("soilType", e.target.value)} />
            ) : (
              <div className="value">{profile.soilType}</div>
            )}
          </div>

          <div className="pm-detail">
            <div className="label">मुख्य फ़सल</div>
            {isEditing ? (
              <input className="pm-input" value={profile.mainCrop} onChange={(e) => onChange("mainCrop", e.target.value)} />
            ) : (
              <div className="value">{profile.mainCrop}</div>
            )}
          </div>

          <div className="pm-detail">
            <div className="label">अनुभव</div>
            {isEditing ? (
              <input className="pm-input" value={profile.experience} onChange={(e) => onChange("experience", e.target.value)} />
            ) : (
              <div className="value">{profile.experience}</div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="pm-stats">
        {stats.map((s) => (
          <div key={s.id} className="pm-stat-card">
            <div className="pm-stat-icon">
              <s.Icon size={20} className={s.colorClass + " icon-inline"} />
            </div>
            <div className="pm-stat-value">{s.value}</div>
            <div className="pm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements (with emoji) */}
      <div className="pm-card pm-achievements">
        <h3 className="pm-card-title">उपलब्धियां</h3>
        <div className="pm-ach-grid">
          {achievements.map((a) => (
            <div key={a.id} className={`pm-ach-item ${a.earned ? "earned" : "locked"}`}>
              <div className="ach-emoji">{a.emoji}</div>
              <div className="ach-text">
                <div className="ach-title">{a.title}</div>
                <div className="ach-desc">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="pm-card pm-menu">
        <div className="pm-menu-row"><div className="menu-left"><Settings size={16} className="icon-inline" /> <span>सेटिंग्स</span></div><div>›</div></div>
        <div className="pm-menu-row"><div className="menu-left"><Bell size={16} className="icon-inline" /> <span>सूचनाएँ</span></div><div>›</div></div>
        <div className="pm-menu-row"><div className="menu-left"><Globe size={16} className="icon-inline" /> <span>भाषा</span></div><div>›</div></div>
        <div className="pm-menu-row"><div className="menu-left"><HelpCircle size={16} className="icon-inline" /> <span>सहायता</span></div><div>›</div></div>
        <div className="pm-menu-row"><div className="menu-left"><Info size={16} className="icon-inline" /> <span>ऐप के बारे में</span></div><div>›</div></div>
      </div>

      <div className="pm-footer mb-16">
        <div>स्मार्टफार्म - कृषि सलाहकार ऐप</div>
        <div>संस्करण 1.0.0 | बनाया गया भारत में 🇮🇳</div>
        <div>© 2024 सभी अधिकार सुरक्षित</div>
      </div>
    </div>
  );
};

export default Profile;
