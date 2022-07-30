class BrakeBanner {
	constructor(selector) {
		this.app = new PIXI.Application({
			widtd: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0xffffff,
			resizeTo: window
		})
		document.querySelector(selector).appendChild(this.app.view)
		this.stage = this.app.stage
		// create PIXI loader
		this.loader = new PIXI.Loader();
		// load more static images
		this.loader.add("btn.png", "images/btn.png");
		this.loader.add("btn_circle.png", "images/btn_circle.png");
		this.loader.add("brake_bike.png", "images/brake_bike.png");
		this.loader.add("brake_handlerbar.png", "images/brake_handlerbar.png");
		this.loader.add("brake_lever.png", "images/brake_lever.png");
		this.loader.add("malu_line.png", "images/malu_line.png");

		// load
		this.loader.load();
		// add monitor when static files load completed 
		this.loader.onComplete.add(() => {
			this.show();
		})
	}
	show() {
		let actionButton = this.createActionButton();
		actionButton.x = actionButton.y = 300;

		const bikeContainer = new PIXI.Container();
		this.stage.addChild(bikeContainer)

		bikeContainer.scale.x = bikeContainer.scale.y = 0.3;

		// bikeContainer.scale.x = bikeContainer.scale.y = 0.3;
		const bikeImage = new PIXI.Sprite(this.loader.resources['brake_bike.png'].texture);
		bikeContainer.addChild(bikeImage)



		const bikeLeverImage = new PIXI.Sprite(this.loader.resources['brake_lever.png'].texture);
		bikeContainer.addChild(bikeLeverImage)

		bikeLeverImage.pivot.x = 455;
		bikeLeverImage.pivot.y = 455;

		bikeLeverImage.x = 722;
		bikeLeverImage.y = 900;
		const bikeHandbarImage = new PIXI.Sprite(this.loader.resources['brake_handlerbar.png'].texture);
		bikeContainer.addChild(bikeHandbarImage)


		this.stage.addChild(actionButton);

		actionButton.interactive = true;
		actionButton.buttonMode = true;
		actionButton.on("mousedown", () => {
			// bikeLeverImage.rotation = Math.PI/180*-30;
			gsap.to(bikeLeverImage, { duration: .6, rotation: Math.PI / 180 * -30 })
			// gsap.to(bikeLeverImage,{duration:.6,rotation : Math.PI/180*-35});
			pause();
		});
		actionButton.on("mouseup", () => {
			// bikeLeverImage.rotation = 0;
			gsap.to(bikeLeverImage, { duration: .6, rotation: 0 })
			start();
		});
		let resize = () => {
			bikeContainer.x = window.innerWidth - bikeContainer.width;
			bikeContainer.y = window.innerHeight - bikeContainer.height;
		}
		window.addEventListener('resize', resize)
		resize();

		// create solid circle
		let particleContainer = new PIXI.Container();
		this.stage.addChild(particleContainer);

		particleContainer.rotation = 35 * Math.PI / 180;
		particleContainer.pivot.x = window.innerWidth / 2;
		particleContainer.pivot.y = window.innerHeight / 2;

		particleContainer.x = window.innerWidth / 2;
		particleContainer.y = window.innerHeight / 2;


		let particles = [];
		const colors = [0xf1cf54, 0xb5cea8, 0xf1cf54, 0x818181, 0x000000];
		for (let i = 0; i < 10; i++) {
			let gr = new PIXI.Graphics();
			let randomColor = Math.floor(Math.random() * colors.length)
			gr.beginFill(colors[randomColor]);
			gr.drawCircle(0, 0, 6);
			gr.endFill();

			let pItem = {
				sx: Math.random() * window.innerWidth,
				sy: Math.random() * window.innerHeight,
				gr: gr
			}

			gr.x = pItem.sx;
			gr.y = pItem.sy;

			particleContainer.addChild(gr);
			particles.push(pItem)
		}
		let speed = 0;
		function loop() {
			speed += .5;
			speed = Math.min(speed, 20);
			for (let i = 0; i < particles.length; i++) {
				let pItem = particles[i];
				// pItem.gr.y += 10;
				pItem.gr.y += speed;
				if (speed >= 20) { // since slow to fast
					pItem.gr.scale.y = 40;
					pItem.gr.scale.x = 0.03;
				}
				if (pItem.gr.y > window.innerHeight) {
					pItem.gr.y = 0;
				}
			}
		}
		function start() {
			speed = 0;
			// gasp.ticker.add(loop)
			gsap.ticker.add(loop);
		}
		function pause() {
			gsap.ticker.remove(loop);

			for (let i = 0; i < particles.length; i++) {
				let pItem = particles[i];
				// pItem.gr.y += 10;
				pItem.gr.y += speed;

				pItem.gr.scale.y = 1;
				pItem.gr.scale.x = 1;

				gsap.to(pItem.gr, { duration: .6, x: pItem.sx, y: pItem.sy, ease: 'eelastic.out' })

			}

		}
		// start();
		// gsap.ticker.add(loop);
		// solid circle have many color
		// solid circle constant move to one direction
		//  solid circle out of boundaries that it will continue move
		// it will bounce when push button stop
		// when relax mouse it can continue move




	}
	createActionButton() {
		// create container
		let actionButton = new PIXI.Container();

		let btnImage = new PIXI.Sprite(this.loader.resources['btn.png'].texture);
		let btnCircle = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture)
		let btnCircle2 = new PIXI.Sprite(this.loader.resources['btn_circle.png'].texture)

		// add sence
		actionButton.addChild(btnImage);
		actionButton.addChild(btnCircle);
		actionButton.addChild(btnCircle2);

		// get center of circle
		btnImage.pivot.x = btnImage.pivot.y = btnImage.width / 2
		btnCircle.pivot.x = btnCircle.pivot.y = btnCircle.width / 2
		btnCircle2.pivot.x = btnCircle2.pivot.y = btnCircle2.width / 2
		btnCircle.scale.x = btnCircle.scale.y = 0.8
		gsap.to(btnCircle.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 })
		gsap.to(btnCircle.scale, { duration: 1, alpha: 0, repeat: -1 })
		return actionButton;
	}


}