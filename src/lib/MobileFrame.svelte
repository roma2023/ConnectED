<div class="container">
    <div class="mobile-frame">
        <div class="content">
            <slot />
        </div>
    </div>
</div>

<style global>
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000;
    }

    .container {
        width: 100%;
        height: 100vh;
        display: grid;
        place-items: center;
        position: relative;
        background: #000;
    }

    .mobile-frame {
        width: 400px;
        height: 750px;
        background: #ffffff;
        border-radius: 40px;
        position: relative;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        animation: float 3s ease-in-out infinite;
    }

    .mobile-frame::before {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 42px;
        background: linear-gradient(
            45deg,
            rgba(0, 255, 255, 0.8),
            rgba(0, 255, 255, 0.2)
        );
        z-index: -1;
        filter: blur(20px);
        animation: pulse 2s ease-in-out infinite;
    }

    .content {
        height: 100%;
        width: 100%;
        position: relative;
        border-radius: inherit;
        overflow: hidden;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @keyframes pulse {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.4; }
    }
</style>