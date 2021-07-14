<template>
  <div></div>
</template>

<script>
import Phaser from "phaser";
const WINDOW_WIDTH = 350;
const WINDOW_HEIGHT = 550;
const Ratio = window.devicePixelRatio;
const endLineY = 40 * Ratio;
const SCALE = 0.5;
class Demo extends Phaser.Scene {
  constructor() {
    super("demo");
    this.enableAdd = true;
    this.score = 0;
    this.scoreText = null;
    this.particles = null;
    this.gameModal = new Map();
    this.randomLevel = 5;
  }
  preload() {
    for (let i = 0; i < 12; i++) {
      this.load.image(`${i}`, `image/${i}.png`);
    }
    this.load.image("ground", "image/ground.png");
    this.load.image("endLine", "image/endLine.png");
    this.load.image("light", "image/endLine.png");
    this.load.image("gameOver", "image/gameover.png");
    this.load.image("tryagain", "image/tryagain.png");
    this.load.image("yes", "image/yes.png");
    this.load.image("no", "image/no.png");
    this.load.atlas("success", "image/confi.png", "image/confi.json");
  }
  create() {
    //底部地面
    this.matter.world.setBounds();
    const groundSprite = this.add.tileSprite(
      WINDOW_WIDTH / 2,
      WINDOW_HEIGHT - 5 * Ratio,
      WINDOW_WIDTH,
      127,
      "ground"
    );
    this.matter.add.gameObject(groundSprite, { isStatic: true });

    //分数
    this.scoreText = this.add
      .text(30, 20, `${this.score}`, {
        font: "45px Arial Black",
        color: "#ffe325",
      })
      .setStroke("#974c1e", 8);

    //终止线
    const endLineSprite = this.add.tileSprite(
      WINDOW_WIDTH / 2,
      endLineY,
      WINDOW_WIDTH,
      8,
      "endLine"
    );
    endLineSprite.setScale(1, SCALE);
    endLineSprite.setAlpha(0);
    this.matter.add.gameObject(endLineSprite, {
      isStatic: true,
      isSensor: true,
      onCollideActiveCallback: (e) => {
        if (this.enableAdd) {
          if (e.bodyB.velocity.y < 1 && e.bodyA.velocity.y < 1) {
            this.events.emit("endGame");
          }
        }
      },
    });

    this.particles = this.add.particles("success");

    //初始一个水果
    const x = WINDOW_WIDTH / 2;
    const y = WINDOW_HEIGHT / 10;
    let fruit = this.createFruite(x, y);

    //点击屏幕
    this.input.on("pointerdown", (point) => {
      if (this.enableAdd) {
        this.enableAdd = false;
        this.tweens.add({
          targets: fruit,
          x: point.x,
          duration: 100,
          ease: "Power1",
          onComplete: () => {
            fruit.setAwake();
            fruit.setStatic(false);
            setTimeout(() => {
              fruit = this.createFruite(x, y);
              this.enableAdd = true;
            }, 1000);
          },
        });
      }
    });

    const onCollisionStart = (event) => {
      const paris = event.source.pairs.list;
      paris.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        const same = bodyA.label === bodyB.label && bodyA.label !== "11";
        const live = !bodyA.isStatic && !bodyB.isStatic;
        if (same && live) {
          if (bodyA.label === "10") {
            this.events.emit("success");
          }
          bodyA.isStatic = true;
          bodyB.isStatic = true;
          const { x, y } = bodyA.position || { x: 0, y: 0 };
          this.tweens.add({
            targets: bodyB.position,
            props: {
              x: { value: x, ease: "Power3" },
              y: { value: y, ease: "Power3" },
            },
            duration: 150,
            onComplete: () => this.onCompose(bodyA, bodyB),
          });
        }
      });
    };
    //碰撞事件
    this.matter.world.on("collisionstart", onCollisionStart);

    //游戏失败
    this.events.once("endGame", () => {
      this.input.off("pointerdown");
      this.tweens.add({
        targets: endLineSprite,
        alpha: {
          from: 0,
          to: 1,
        },
        repeat: 3,
        duration: 300,
        onComplete: () => {
          this.gameModal.get("endModal").setVisible(true);
        },
      });
    });

    //游戏成功
    this.events.on("success", () => {
      const frame = [
        "c1.png",
        "c2.png",
        "c3.png",
        "c4.png",
        "c5.png",
        "c6.png",
        "c7.png",
        "c8.png",
      ];

      const config = {
        frame: frame,
        x: { min: 0, max: WINDOW_WIDTH },
        speed: { min: 250, max: 300 },
        gravityY: 400,
        lifespan: 4000,
        quantity: 2,
        y: WINDOW_HEIGHT / 4,
        maxParticles: 100,
        angle: { min: 220, max: 320 },
        scale: { start: 0.5, end: 0.8 },
      };
      this.particles.createEmitter(config);
    });

    this.createEndModal();
  }

  //水果合成后
  onCompose(bodyA, bodyB) {
    const { x, y } = bodyA.position;
    const score = parseInt(bodyA.label);
    const label = score + 1;
    //这里合成后，直接消失，有时间的话可以加一些帧动画之类的
    bodyA.gameObject.alpha = 0;
    bodyB.gameObject.alpha = 0;
    bodyB.destroy();
    bodyA.destroy();
    this.createFruite(x, y, false, `${label}`);

    //得分
    this.score += score;
    if (score === 10) {
      this.score += 100;
    }
    //根据分数增加初始掉落水果等级
    const add = Math.floor(this.score / 100);
    if (add < 4) {
      this.randomLevel = 5 + add;
    }
    this.scoreText.setText(this.score);
  }
  //游戏结束的画板
  createEndModal() {
    const modalContainer = this.creatMask();
    const centerX = WINDOW_WIDTH / 2;
    const gameOver = this.add.sprite(centerX, 100, "gameOver");
    const tryAgain = this.add.sprite(centerX, 200, "tryagain");
    const yes = this.add.sprite(centerX - 50, 400, "yes");
    const no = this.add.sprite(centerX + 50, 400, "no");
    gameOver.setScale(0.5);
    tryAgain.setScale(0.5);
    yes.setScale(0.5);
    yes.setInteractive();
    yes.on("pointerdown", () => {
      this.restart();
    });
    no.setScale(0.5);
    modalContainer.add([gameOver, tryAgain, yes, no]);
    modalContainer.setVisible(false);
    modalContainer.setDepth(11);
    this.gameModal.set("endModal", modalContainer);
  }
  //清除画板
  creatMask() {
    const mask = this.add.graphics();
    mask.fillStyle(0x000000, 0.7);
    mask.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    return this.add.container(0, 0, [mask]);
  }
  createFruite(x, y, isStatic = true, key) {
    if (!key) {
      //顶部落下的瓜前5个随机
      key = `${Phaser.Math.Between(1, this.randomLevel)}`;
    }
    const fruit = this.matter.add.image(x, y, key);
    fruit.setBody(
      {
        type: "circle",
        radius: fruit.width / 2,
      },
      {
        label: key,
        restitution: 0.3,
        friction: 0.1,
        isStatic,
      }
    );
    fruit.setScale(SCALE);
    fruit.setSleepEvents(true, true);

    //添加动画
    this.tweens.add({
      targets: fruit,
      scale: {
        from: 0,
        to: SCALE,
      },
      ease: "Back",
      easeParams: [3.5],
      duration: 200,
    });
    return fruit;
  }
  restart() {
    this.scene.restart();
    this.score = 0;
    this.randomLevel = 5;
  }
}
export default {
  name: "Main",
  setup() {
    const init = () => {
      const config = {
        type: Phaser.AUTO,
        backgroundColor: "#ffe8a3",
        mode: Phaser.Scale.FIT,
        physics: {
          default: "matter",
          matter: {
            gravity: {
              y: 2,
            },
            debug: true,
          },
        },
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        scene: Demo,
      };
      const game = new Phaser.Game(config);
      return {
        game,
      };
    };
    init();
  },

  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
