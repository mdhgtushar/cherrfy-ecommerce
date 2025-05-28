import React, { useState } from "react";

const initialSettings = {
    storeName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    logo: null,
};

export default function Settings() {
    const [settings, setSettings] = useState(initialSettings);
    const [logoPreview, setLogoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo" && files.length) {
            setSettings((prev) => ({ ...prev, logo: files[0] }));
            setLogoPreview(URL.createObjectURL(files[0]));
        } else {
            setSettings((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Submit settings to backend
        alert("Settings saved!");
    };

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
            <h2>Vendor Settings</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Store Name</label>
                    <input
                        type="text"
                        name="storeName"
                        value={settings.storeName}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={settings.phone}
                        onChange={handleChange}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={settings.address}
                        onChange={handleChange}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={settings.description}
                        onChange={handleChange}
                        rows={3}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Store Logo</label>
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "block", marginTop: 4 }}
                    />
                    {logoPreview && (
                        <img
                            src={logoPreview}
                            alt="Logo Preview"
                            style={{ marginTop: 8, maxHeight: 80, borderRadius: 4 }}
                        />
                    )}
                </div>
                <button type="submit" style={{ padding: "10px 24px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4 }}>
                    Save Settings
                </button>
            </form>
        </div>
    );
}