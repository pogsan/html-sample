const contents = d3.select('#chart--wrapper');
const svg = contents.append("svg");
const padding = 30;
let color = d3.rgb("#85a7cc");


let dataset = [
    {
        date: "2019/1/1",
        value: 70
    },
    {
        date: "2019/2/1",
        value: 65.1
    },
    {
        date: "2019/3/1",
        value: 81.6
    },
    {
        date: "2019/4/1",
        value: 55.3
    },
    {
        date: "2019/5/1",
        value: 30.6
    },
    {
        date: "2019/6/1",
        value: 55.4
    },
    {
        date: "2019/7/1",
        value: 72.9
    },
    {
        date: "2019/8/1",
        value: 82.2
    },
    {
        date: "2019/9/1",
        value: 66.4
    },
    {
        date: "2019/10/1",
        value: 73.3
    },
    {
        date: "2019/11/1",
        value: 25.4
    },
    {
        date: "2019/12/1",
        value: 57.4
    }
];
let x, y, xScale, yScale, width, height, line, path;

let timeparser = d3.timeParse("%Y/%m/%d");
// x軸の目盛りの表示フォーマット
let format = d3.timeFormat("%Y/%m");

const lineChart = {
    initialize: function () {
        dataset = dataset.map(function (d) {
            // 日付のデータをパース
            return { date: timeparser(d.date), value: d.value };
        });
        // レンダリング
        this.rendar();
        // アップデート
        this.update();
        // リサイズ時の処理
        this.resize();
    },
    rendar: function () {

        // パス要素を追加
        path = svg.append("path");

        // svg要素にg要素を追加しクラスを付与しxに代入
        x = svg.append("g")
            .attr("class", "axis axis-x");

        // svg要素にg要素を追加しクラスを付与しyに代入
        y = svg.append("g")
            .attr("class", "axis axis-y");

    },
    update: function () {
        // グラフの幅
        width = contents.node().clientWidth - padding;
        // グラフの高さ
        height = contents.node().clientHeight - padding;
        // X軸Y軸を追加
        this.addScales();
        // ラインを追加
        this.addLine();
    },
    resize: function () {
        let self = this;
        window.addEventListener("resize", function () {
            // アップデート
            self.update();
        })
    },
    addScales: function () {

        // x軸の目盛りの量
        let xTicks = (window.innerWidth < 768) ? 6 : 12;
        // X軸を時間のスケールに設定する
        xScale = d3.scaleTime()
            // 最小値と最大値を指定しX軸の領域を設定する
            .domain([
                // データ内の日付の最小値を取得
                d3.min(dataset, function (d) { return d.date; }),
                // データ内の日付の最大値を取得
                d3.max(dataset, function (d) { return d.date; })
            ])
            // SVG内でのX軸の位置の開始位置と終了位置を指定しX軸の幅を設定する
            .range([padding, width]);


        // Y軸を値のスケールに設定する
        yScale = d3.scaleLinear()
            // 最小値と最大値を指定しX軸の領域を設定する
            .domain([
                // 0を最小値として設定
                0,
                // データ内のvalueの最大値を取得
                d3.max(dataset, function (d) { return d.value; })
            ])
            // SVG内でのY軸の位置の開始位置と終了位置を指定しY軸の幅を設定する
            .range([height, padding]);

        // scaleをセットしてX軸を作成
        axisx = d3.axisBottom(xScale)
            // グラフの目盛りの数を設定
            .ticks(xTicks)
            // 目盛りの表示フォーマットを設定
            .tickFormat(format);

        // scaleをセットしてY軸を作成
        axisy = d3.axisLeft(yScale);

        // X軸の位置を指定し軸をセット
        x.attr("transform", "translate(" + 0 + "," + (height) + ")")
            .call(axisx);

        // Y軸の位置を指定し軸をセット
        y.attr("transform", "translate(" + padding + "," + 0 + ")")
            .call(axisy)
    },
    addLine: function () {

        //lineを生成
        line = d3.line()
            // lineのX軸をセット
            .x(function (d) { return xScale(d.date); })
            // lineのY軸をセット
            .y(function (d) { return yScale(d.value); })

        path
            // dataをセット
            .datum(dataset)
            // 塗りつぶしをなしに
            .attr("fill", "none")
            // strokeカラーを設定
            .attr("stroke", color)
            // d属性を設定
            .attr("d", line)

    }
};

lineChart.initialize();

var map = L.map('mapid', {
    center: [35.66572, 139.73100],
    zoom: 17,
  });
  var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  });
  tileLayer.addTo(map);

function onClick(){
  $("#spinner1").toggleClass("spinner");
  $("#overlay1").toggleClass("overlay");

  $("#spinner2").toggleClass("spinner");
  $("#overlay2").toggleClass("overlay");
}