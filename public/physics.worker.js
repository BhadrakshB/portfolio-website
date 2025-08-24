let RAPIER;
let world;
let rigidBodies = [];

self.onmessage = async (event) => {
    const { type, payload } = event.data;

    if (type === 'init') {
        if (!RAPIER) {
            // The `self.RAPIER` is a workaround for skypack's module format in a worker
            importScripts('https://cdn.skypack.dev/@dimforge/rapier3d-compat');
            RAPIER = self.RAPIER;
            await RAPIER.init();
        }

        const gravity = { x: 0.0, y: -9.81, z: 0.0 };
        world = new RAPIER.World(gravity);

        // Ground plane to collide with
        let groundColliderDesc = RAPIER.ColliderDesc.cuboid(20.0, 0.1, 20.0);
        world.createCollider(groundColliderDesc);

        // Start the simulation loop
        setInterval(update, 16); // ~60 FPS
        self.postMessage({ type: 'initialized' });
    }

    if (type === 'triggerEffect') {
        if (!world) return;

        // Clear previous bodies
        rigidBodies.forEach(body => world.removeRigidBody(body));
        rigidBodies = [];

        // Create a grid of debris particles
        const num = 4; // 4x4x4 = 64 particles
        const spacing = 0.4;
        const initialY = 3.0;

        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                for (let k = 0; k < num; k++) {
                    let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
                        (i - num / 2) * spacing,
                        initialY + j * spacing,
                        (k - num / 2) * spacing
                    );
                    let rigidBody = world.createRigidBody(rigidBodyDesc);
                    let colliderDesc = RAPIER.ColliderDesc.ball(0.1);
                    world.createCollider(colliderDesc, rigidBody);

                    // Apply an initial upward force for an explosion effect
                    const impulse = new RAPIER.Vector3(
                        (Math.random() - 0.5) * 5,
                        Math.random() * 5,
                        (Math.random() - 0.5) * 5
                    );
                    rigidBody.applyImpulse(impulse, true);

                    rigidBodies.push(rigidBody);
                }
            }
        }
    }
};

function update() {
    if (!world || rigidBodies.length === 0) return;

    world.step();

    // In a real app, you might want to use transferable objects for performance
    const positions = new Float32Array(rigidBodies.length * 3);
    for (let i = 0; i < rigidBodies.length; i++) {
        const pos = rigidBodies[i].translation();
        positions[i * 3 + 0] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
    }

    self.postMessage({
        type: 'positions',
        positions: positions
    });
}
