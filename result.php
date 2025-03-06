<!DOCTYPE html>
<html>

<head>
    <title>Finding Falcone</title>
    <link rel="icon" type="image/png" href="pics/logo.svg">
    <link rel="stylesheet" href="css/result.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>

<body>
    <header class="header">
        <img src="pics/logo.svg" alt="Finding Falcone Logo" class="logo">
        <h3 class="header-title">Finding Falcone</h3>
        <div class="right-section">
            <!-- <div class="reset-container">
                <img src="pics/reset_logo.svg" alt="Reset Logo" class="reset-logo">
                <p class="reset">Reset</p>
            </div> -->
            <a href="index.php" class="home-container">
                <img src="pics/home_logo.svg" alt="Home Logo" class="home-logo">
                <p class="reset">Home</p>
            </a>
        </div>
    </header>

    <div class="main-container">
        <div class="pic-container">
            <img src="pics/falcon.png" alt="King Shan" class="falcon-pic">
        </div>
        <div class="result-container">
            <p class="message-result" id="message-result">Mission Successful!</p>
            <p class="message-note" id="message-note">King Shan is mighty pleased</p>
            <p class="time" id="time">Time Taken: N hours</p>
            <p class="planet" id="planet">Planet Found: Planet Name</p>

            <div class="again-container">
                <a href="main.php">
                    <button class="again-button">
                        <svg width="39" height="45" viewBox="0 0 39 45" fill="currentColor" class="again-pic">
                            <path d="M17.0625 45C12.1469 44.3902 8.07463 42.2463 4.84575 38.5683C1.61687 34.8902 0.001625 30.5707 0 25.6098C0 22.9268 0.528125 20.3561 1.58438 17.8976C2.64063 15.439 4.14375 13.2943 6.09375 11.4634L9.56719 14.939C8.02344 16.3211 6.85588 17.9268 6.0645 19.7561C5.27312 21.5854 4.87663 23.5366 4.875 25.6098C4.875 29.187 6.0125 32.348 8.2875 35.0927C10.5625 37.8374 13.4875 39.5138 17.0625 40.1219V45ZM21.9375 45V40.1219C25.4719 39.4715 28.3871 37.7845 30.6832 35.061C32.9794 32.3374 34.1266 29.187 34.125 25.6098C34.125 21.5447 32.7031 18.0894 29.8594 15.2439C27.0156 12.3984 23.5625 10.9756 19.5 10.9756H19.3172L21.9984 13.6585L18.5859 17.0732L10.0547 8.53658L18.5859 0L21.9984 3.41463L19.3172 6.09756H19.5C24.9438 6.09756 29.5547 7.9878 33.3328 11.7683C37.1109 15.5488 39 20.1626 39 25.6098C39 30.5285 37.3856 34.8276 34.1567 38.5073C30.9278 42.187 26.8547 44.3512 21.9375 45Z" fill="white" />
                        </svg>
                        Start Again</button></a>

            </div>
        </div>
    </div>

    <footer class="footer">
        <p class="footer-note">by: Mark Francis Gorreon</p>
    </footer>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const params = new URLSearchParams(window.location.search);
            const status = params.get("status");
            const planet = params.get("planet");
            const time = params.get("time");

            const planetMessage = document.getElementById("planet");
            const timeMessage = document.getElementById("time");
            const resultMessage = document.getElementById("message-result");
            const noteMessage = document.getElementById("message-note");


            if (status === "success") {
                planetMessage.innerHTML = `Planet Found: ${planet}`;
                timeMessage.innerHTML = `Time Taken: ${time}`;
            } else {
                resultMessage.innerHTML = `Mission Unsuccessful!`;
                noteMessage.innerHTML = `King Shan is mighty displeased`;
                document.getElementById("time").style.visibility = "hidden";
                document.getElementById("planet").style.visibility = "hidden";
            }
        });
    </script>
</body>

</html>