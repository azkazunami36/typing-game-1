var q = [..."abcdefghijklmnopqrstuvwxyz"];
const config = {
    time: 30, //ゲームの制限時間
    roundtime: 2 //キー入力の待機時間
}
var round = 0, win = 0, lose = 0, keyname, keyNo = 0, gametime = config.time, keyreaction = true, roundtime = config.roundtime * 10; //初期化
addEventListener('keydown', e => { //キーが押されたら...
    var key = e.key; //e.keyの内容をeに格納
    if (round == 0) { //ラウンドが0(ゲームがスタートしていない)なら...
        start(); //ゲームを始める関数を実行
        document.getElementById("time").innerHTML = gametime; //制限時間の反映
    } else if (key == keyname) { //keyかkeyname(roundset関数にてアルファベットがランダムに格納済み)と同じなら
        win++; //winの数を増やす
        roundtime = config.roundtime * 10; //待機時間の初期化
    } else {
        lose++; //loseの数を増やす
        roundtime = config.roundtime * 10; //待機時間の初期化
    };
    if (keyreaction == false) { //keyreaction(キー反応が可能かどうかを判定するための変数)がfalseなら...
        console.log("ゲームはすでに終了しています。"); //終了を伝えるログ
    } else { //でなければ...
        roundset(); //アルファベットを表示したり、ラウンド数をコントロールしたりする
    };
});
const start = () => { //スタート関数
    var gametimer = setInterval(() => { //gametimerのタイマーを作成
        if (gametime == 0) { //gametimeが0になったら...
            console.log("終了"); //終了を伝えるログ
            keyreaction = false; //キー反応が可能化動画を判定するための変数
            clearInterval(gametimer); //タイマーを止める
            clearInterval(roundtimer); //タイマーを止める
            document.getElementById("start").innerHTML = "ゲーム終了！"; //ゲーム終了をUIを表示する
        } else { //でなければ...
            gametime--; //gametineの数を減らす
        };
        document.getElementById("time").innerHTML = gametime; //制限時間を表示
    }, 1000); //タイマーの周期
    var roundtimer = setInterval(() => { //roundtimerのタイマーを作成
        if (roundtime < 1) { //roundtimeが1より少なくなったら...
            lose++; //loseの数を増やす
            roundset(); //アルファベットを表示したり、ラウンド数をコントロールしたりする
            roundtime = config.roundtime * 10; //待機時間の初期化
        } else { //でなければ...
            roundtime--; //roundtimeの数を減らす
        };
        document.getElementById("roundtime").innerHTML = roundtime / 10; //待機時間を表示(整数を割ることで正確な時間表現を実現)
    }, 100); //タイマーの周期
};
const scoreset = () => { //scoreset関数
    document.getElementById("win").innerHTML = win; //勝利数を表示
    document.getElementById("lose").innerHTML = lose; //敗北数を表示
    document.getElementById("round").innerHTML = round; //ラウンドを表示
};
const roundset = () => { //roundset関数
    keyname = q[Math.floor(Math.random() * (q.length))]; //keynameにqの中からランダムに文字を入れる
    console.log("keyname:" + keyname); //入れられた文字をログに出力
    round++; //roundの数を増やす
    document.getElementById("start").innerHTML = keyname; //文字を表示
    scoreset(); //スコアたちを反映する関数を実行
};
