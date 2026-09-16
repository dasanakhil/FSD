window.addEventListener("load", () => {

    // Check Three.js
    if (typeof THREE === "undefined") {
        console.error("Three.js failed to load.");
        return;
    }

    const canvas = document.getElementById("scene");

    if (!canvas) {
        console.error("Canvas with id='scene' not found.");
        return;
    }

    // =========================
    // SCENE
    // =========================
    const scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0x020509, 0.018);

    // =========================
    // CAMERA
    // =========================
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(0, 8, 30);

    // =========================
    // RENDERER
    // =========================
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // =========================
    // LIGHTS
    // =========================
    const ambientLight = new THREE.AmbientLight(
        0x556677,
        1.5
    );

    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    moonLight.position.set(10, 30, 10);

    scene.add(moonLight);

    // =========================
    // DESERT
    // =========================
    const desertGeometry = new THREE.PlaneGeometry(
        200,
        200
    );

    const desertMaterial = new THREE.MeshStandardMaterial({
        color: 0x171b1e,
        roughness: 1
    });

    const desert = new THREE.Mesh(
        desertGeometry,
        desertMaterial
    );

    desert.rotation.x = -Math.PI / 2;
    desert.position.y = -2;

    scene.add(desert);

    // =========================
    // MOUNTAINS
    // =========================
    for (let i = 0; i < 12; i++) {

        const mountainGeometry =
            new THREE.ConeGeometry(
                Math.random() * 7 + 5,
                Math.random() * 12 + 8,
                4
            );

        const mountainMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x080b0d,
                roughness: 1
            });

        const mountain = new THREE.Mesh(
            mountainGeometry,
            mountainMaterial
        );

        mountain.position.x =
            (Math.random() - 0.5) * 100;

        mountain.position.z =
            -30 - Math.random() * 30;

        mountain.position.y =
            Math.random() * 2;

        scene.add(mountain);
    }

    // =========================
    // AREA 51 BUILDING
    // =========================
    const buildingGeometry =
        new THREE.BoxGeometry(14, 7, 9);

    const buildingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x15191d,
            roughness: 0.8,
            metalness: 0.3
        });

    const building = new THREE.Mesh(
        buildingGeometry,
        buildingMaterial
    );

    building.position.set(0, 1.5, -8);

    scene.add(building);

    // =========================
    // ROOF
    // =========================
    const roofGeometry =
        new THREE.BoxGeometry(15, 0.8, 10);

    const roofMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x080a0c,
            metalness: 0.7,
            roughness: 0.3
        });

    const roof = new THREE.Mesh(
        roofGeometry,
        roofMaterial
    );

    roof.position.set(0, 5.4, -8);

    scene.add(roof);

    // =========================
    // WINDOWS
    // =========================
    for (let x = -5; x <= 5; x += 2.5) {

        const windowGeometry =
            new THREE.BoxGeometry(1.2, 1.2, 0.15);

        const windowMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x8b0000
            });

        const win = new THREE.Mesh(
            windowGeometry,
            windowMaterial
        );

        win.position.set(x, 2, -12.55);

        scene.add(win);
    }

    // =========================
    // RUNWAY
    // =========================
    const runwayGeometry =
        new THREE.PlaneGeometry(7, 70);

    const runwayMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x090b0d
        });

    const runway = new THREE.Mesh(
        runwayGeometry,
        runwayMaterial
    );

    runway.rotation.x = -Math.PI / 2;

    runway.position.set(0, -1.9, 18);

    scene.add(runway);

    // =========================
    // RUNWAY LIGHTS
    // =========================
    for (let z = -15; z < 55; z += 3) {

        const lightGeometry =
            new THREE.SphereGeometry(0.12, 8, 8);

        const lightMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            });

        const lightLeft =
            new THREE.Mesh(
                lightGeometry,
                lightMaterial
            );

        const lightRight =
            new THREE.Mesh(
                lightGeometry,
                lightMaterial
            );

        lightLeft.position.set(-3.2, -1.7, z);
        lightRight.position.set(3.2, -1.7, z);

        scene.add(lightLeft);
        scene.add(lightRight);
    }

    // =========================
    // UFO
    // =========================
    const ufoGroup = new THREE.Group();

    // UFO body
    const ufoBodyGeometry =
        new THREE.SphereGeometry(3, 32, 16);

    const ufoBodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x777777,
            metalness: 0.9,
            roughness: 0.2
        });

    const ufoBody = new THREE.Mesh(
        ufoBodyGeometry,
        ufoBodyMaterial
    );

    ufoBody.scale.set(1.7, 0.35, 1.7);

    ufoGroup.add(ufoBody);

    // UFO dome
    const domeGeometry =
        new THREE.SphereGeometry(1.3, 32, 16);

    const domeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x223344,
            transparent: true,
            opacity: 0.8,
            metalness: 0.5
        });

    const dome = new THREE.Mesh(
        domeGeometry,
        domeMaterial
    );

    dome.scale.y = 0.5;
    dome.position.y = 0.7;

    ufoGroup.add(dome);

    // UFO lights
    for (let i = 0; i < 12; i++) {

        const angle =
            (i / 12) * Math.PI * 2;

        const lightGeometry =
            new THREE.SphereGeometry(0.12, 8, 8);

        const lightMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            });

        const light =
            new THREE.Mesh(
                lightGeometry,
                lightMaterial
            );

        light.position.set(
            Math.cos(angle) * 4.5,
            -0.3,
            Math.sin(angle) * 4.5
        );

        ufoGroup.add(light);
    }

    ufoGroup.position.set(
        0,
        16,
        -5
    );

    scene.add(ufoGroup);

    // =========================
    // UFO BEAM
    // =========================
    const beamGeometry =
        new THREE.ConeGeometry(
            5,
            14,
            32,
            1,
            true
        );

    const beamMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x00ffcc,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide
        });

    const beam =
        new THREE.Mesh(
            beamGeometry,
            beamMaterial
        );

    beam.position.set(0, 8, -5);

    beam.rotation.x = Math.PI;

    scene.add(beam);

    // =========================
    // STARS
    // =========================
    const starGeometry =
        new THREE.BufferGeometry();

    const starCount = 1500;

    const starPositions =
        new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {

        starPositions[i] =
            (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            starPositions,
            3
        )
    );

    const starMaterial =
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.12
        });

    const stars =
        new THREE.Points(
            starGeometry,
            starMaterial
        );

    scene.add(stars);

    // =========================
    // MOUSE MOVEMENT
    // =========================
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX / window.innerWidth - 0.5);

            mouseY =
                (event.clientY / window.innerHeight - 0.5);
        }
    );

    // =========================
    // ANIMATION
    // =========================
    function animate() {

        requestAnimationFrame(animate);

        const time =
            Date.now() * 0.001;

        // UFO floating
        ufoGroup.position.y =
            16 + Math.sin(time * 1.5) * 0.7;

        ufoGroup.rotation.y += 0.003;

        // Beam pulse
        beam.material.opacity =
            0.05 +
            Math.sin(time * 3) * 0.02;

        // Stars rotation
        stars.rotation.y += 0.0002;

        // Camera movement
        camera.position.x +=
            (mouseX * 3 - camera.position.x) * 0.02;

        camera.position.y +=
            (8 - mouseY * 2 - camera.position.y) * 0.02;

        camera.lookAt(0, 2, -5);

        renderer.render(
            scene,
            camera
        );
    }

    animate();

    // =========================
    // RESIZE
    // =========================
    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );
        }
    );

    // =========================
    // TERMINAL
    // =========================
    window.openTerminal = function () {

        const terminal =
            document.getElementById("terminal");

        if (terminal) {
            terminal.classList.add("active");
        }
    };

    window.closeTerminal = function () {

        const terminal =
            document.getElementById("terminal");

        if (terminal) {
            terminal.classList.remove("active");
        }
    };

    window.activateSystem = function () {

        alert(
            "SYSTEM ACTIVATED\n\nAREA 51 DATABASE ACCESS GRANTED."
        );
    };

});
