<template>
    <div class="intro-container">
      <div class="intro-content">
        <h1>画像ギャラリーへようこそ</h1>
        
        <section class="feature-section">
          <h2>主な機能</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <h3>3段階のタグ検索</h3>
              <p>三階層のタグ構造で画像を効率的に検索できます。</p>
            </div>
            <div class="feature-card">
              <h3>タグ階層の可視化</h3>
              <p>右側のパネルで、現在のタグ構造をツリー形式で確認できます。</p>
            </div>
            <div class="feature-card">
              <h3>画像プレビュー</h3>
              <p>検索結果の画像をグリッド表示で閲覧でき、クリックで詳細を確認できます。</p>
            </div>
          </div>
        </section>
  
        <section class="usage-section">
          <h2>使い方</h2>
          <div class="usage-steps">
            <div class="step">
              <div class="step-number">1</div>
              <p>最上位の「テーマ」タグを選択して、大まかな分類から始めます。</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <p>サブカテゴリタグで絞り込みを行い、より具体的な分類を選択します。</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <p>最後に詳細タグで最も詳細な条件を指定できます。</p>
            </div>
          </div>
        </section>
  
        <div class="action-section">
          <button class="start-button" @click="navigateToGallery">
            ギャラリーを開始する
          </button>
          <p class="note">※ 各レベルのタグは「全て」を選択することもできます</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToGallery() {
        this.$router.push('/gallery');
      }
    }
  };
  </script>
  
  <style scoped>
  .intro-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .intro-content {
    text-align: center;
  }
  
  .intro-content h1 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #333;
  }
  
  .feature-section {
    margin-bottom: 60px;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }
  
  .feature-card {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .feature-card h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  .usage-section {
    margin-bottom: 60px;
  }
  
  .usage-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
    margin: 30px auto;
  }
  
  .step {
    display: flex;
    align-items: center;
    gap: 20px;
    text-align: left;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .step-number {
    background: #4caf50;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .action-section {
    margin-top: 40px;
  }
  
  .start-button {
    background: #4caf50;
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .start-button:hover {
    background: #45a049;
  }
  
  .note {
    margin-top: 20px;
    color: #666;
    font-size: 0.9rem;
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  </style>