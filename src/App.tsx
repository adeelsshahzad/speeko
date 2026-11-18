        <div
          style={{
            background: "#0B141A",
            color: "white",
            padding: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            style={{
              color: "white",
              background: "none",
              border: "none",
              fontSize: "26px",
            }}
            onClick={() => setInC(false)}
          >
            ←
          </button>

          <div
            style={{
              width: "42px",
              height: "42px",
              background: "#00A8E8",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginLeft: "8px",
              marginRight: "10px",
              flexShrink: 0 as const,
            }}
          >
            {s[0]}
          </div>

          <div style={{ flex: 1 }}>
            <b style={{ fontSize: "19px" }}>{s}</b>
            <p style={{ margin: 0, fontSize: "12px", color: "#8696A0" }}>
              Online
            </p>
          </div>

          <span style={{ fontSize: "24px" }}>📹</span>
          <span
            style={{
              fontSize: "24px",
              marginLeft: "24px",
            }}
          >
            📞
          </span>
          <span
            style={{
              fontSize: "24px",
              marginLeft: "24px",
              marginRight: "5px",
            }}
          >
            ⋮
          </span>
        </div>
