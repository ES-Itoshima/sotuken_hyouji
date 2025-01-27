<template>
    <div class="intro-container">
      <div class="intro-content">
        <h1>画像クリッピングと書誌情報アップロード</h1>
  
        <section class="feature-section">
          <h2>主な機能</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <h3>画像のクリッピング</h3>
              <p>クリッピングページでは、画像の特定部分を切り出して保存できます。</p>
            </div>
            <div class="feature-card">
              <h3>書誌情報のアップロード</h3>
              <p>書誌情報アップロードページでは、画像に関連する書誌情報やタグを追加できます。</p>
            </div>
            <div class="feature-card">
              <h3>三層構造のタグ付け</h3>
              <p>テーマ、サブカテゴリ、詳細タグを利用して、画像を体系的に整理可能です。</p>
            </div>
            <div class="feature-card">
              <h3>クリッピングとアノテーション</h3>
              <p>アップロードした書誌情報に対して、画像やクリッピング部分にアノテーションを付与できます。</p>
            </div>
          </div>
        </section>
  
        <section class="usage-section">
          <h2>使い方</h2>
          <div class="usage-steps">
            <div class="step">
              <div class="step-number">1</div>
              <p>クリッピングページで画像をアップロードし、クリッピング領域を指定して保存します。</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <p>保存されたクリッピング画像を、書誌情報アップロードページで開きます。</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <p>書誌情報を入力し、関連するタグをテーマ、サブカテゴリ、詳細タグの順に追加します。</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <p>必要に応じて、アノテーションを付与して保存します。</p>
            </div>
          </div>
        </section>
  
        <div class="action-section">
          <button class="start-button" @click="navigateToClipping">
            アップロードを開始する
          </button>
          <button class="start-button secondary" @click="navigateToUpload">
            ギャラリーページへ行く
          </button>
          <p class="note">※ 各ページ間は画面遷移で移動します。</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToClipping() {
        this.$router.push('/clipping');
      },
      navigateToUpload() {
        this.$router.push('/upload');
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
    margin: 10px;
  }
  
  .start-button.secondary {
    background: #2196f3;
  }
  
  .start-button:hover {
    background: #45a049;
  }
  
  .start-button.secondary:hover {
    background: #1e88e5;
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
  