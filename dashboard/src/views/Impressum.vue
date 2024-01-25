<template>
    <div class="impressum">
        <div class="content">
            <p class="lead">The FH-timing team at Carinthia University of Applied Sciences (Fachhochschule Kärnten)</p>
            <p class="address">
                Fachhochschule Kärnten<br>
                Studiengang Netzwerk- und Kommunikationstechnik<br>
                Helmut Wöllik<br>
                Primoschgasse 8<br>
                9020 Klagenfurt<br>
                Austria<br>
            </p>
            <p class="contact">
                <span class="glyphicon glyphicon-earphone"></span> +43 5 90500-3131<br>
                <span class="glyphicon glyphicon-envelope"></span> <a href="mailto:office@fh-timing.com">office@fh-timing.com</a><br>
            </p>
        </div>
    </div>
</template>

<style scoped>
.impressum {
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}

.content {
    max-width: 600px;
}

.lead {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.address, .contact {
    line-height: 1.6;
}

.contact a {
    color: var(--text-color);
    text-decoration: none;
}

.contact a:hover {
    text-decoration: underline;
    color: #76C657;
}
</style>