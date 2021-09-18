/**********************************************************************************************************
 * 解答入力欄のコンポーネントです。入力欄・送信ボタン・エラーメッセージを表示します。
 * <answer-input v-bind:correct="解答" v-on:answer-input="answerInput(event, stage, number, final)"></answer-input>
 * 解答：correctAnswer['stage1']['q1']
 * answerInput(event, stage, number, final)：
 *          event ：$event
 *          stage ：STAGE名 'stage1'
 *          number：問題番号（数字） 1
 *          final ：最終ステージの場合 'final'
 *********************************************************************************************************/
const app = Vue.createApp({
  data() {
    /* 初期値を設定します */
    return {
      correctAnswer: {
        stage1: {
          q1: 'Twitter',
        },
        
        stage2: {
          q1: 'YouTube',
        },

        stage3: {
          q1: 'Final',
        }
      },

      /* それぞれの問題が正解かどうか
      *  ex. 問題2-3を追加する場合は配列にfalseを追加します。
      */
      answer: {
        stage1: [
          false,
        ],
        stage2: [
          false,
        ],
        stage3: [
          false, 
        ]

      },

      /* ステージの問題が全て正解かどうか */
      clear: {
        stage1: false,
        stage2: false,
        stage3: false,

      },

      /* 次のステージを表示するかどうか
      *  最終ステージはページを遷移するので設定不要です。
      */
      next: {
        stage0: true,
        stage1: false,
        stage2: false,

      },
    }
  },
  methods: {
    /* 「送信」ボタンをクリックした場合の動作です。 */
    answerInput(event, stage, number, final) {
      /* answerをtrueまたはfalseにします。 */
      this.answer[stage][number-1] = event;
      /* STAGEのすべての問題がtrueか調べてclearの値を変更します。*/
      const result = this.answer[stage].every((element) => {
        return element;
      });
      this.clear[stage] = result;
      /* 最終ステージの入力を判定します。 */
      if ( this.clear[stage] === true && final === 'final' ) {
        window.location.href = 'final.html';
      }
    },
    /* クリア画面「次のステージへ」ボタンをクリックした時の動作を設定します
    *  clearをfalseにしてクリア画面を非表示にします。
    *  nextをtrueにして次のステージを表示します。
    */
    nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
      this.next["stage"+(Number(stage.substr(-1))-1)] = false;
    },
  }
})

/* 解答入力欄のコンポーネント */
app.component('answer-input', {
  props: ['correct'],
  data: function () {
    return {
      /* 送信ボタン上下に表示されるメッセージ */
      okMessage: '一致しました',
      ngMessage: '入力がデータと一致しません',
      message: '',
      inputAnswer: '',
    }
  },
  template: `
    <div>
      <div>
        <input type="text" v-model="inputAnswer" placeholder="答えを入力せよ">
      </div>
      <span v-if="message === ngMessage" class="err-message">{{ message }}</span>
      <span v-if="message === okMessage" class="err-message">{{ message }}</span>
      <br>
      <button v-on:click="judgement(inputAnswer)" class="btn-flat-border sousin">送信</button>
    </div>`,
  methods: {
    judgement(answer) {
      if(answer === this.correct) { // 入力値が解答と一致する場合
        this.message = this.okMessage;
        this.$emit('answerInput', true);
      } else { // 一致しない場合
        this.message = this.ngMessage; 
        this.$emit('answerInput', false);
      }
    },
  }
})

app.mount('#stage')