#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔨 Building Gutter Chatbot Package...\n');

const buildDir = path.join(__dirname, '../dist');
const frontendDir = path.join(__dirname, '../frontend');

// Create dist directory
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

try {
    // Copy frontend files to dist
    console.log('📁 Copying frontend files...');
    copyRecursiveSync(frontendDir, buildDir);
    
    // Minify CSS (basic minification)
    console.log('🎨 Minifying CSS...');
    const cssPath = path.join(buildDir, 'css/styles.css');
    if (fs.existsSync(cssPath)) {
        let css = fs.readFileSync(cssPath, 'utf8');
        css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
        css = css.replace(/\s+/g, ' '); // Compress whitespace
        css = css.replace(/;\s*}/g, '}'); // Remove semicolons before closing braces
        fs.writeFileSync(cssPath, css);
    }
    
    // Minify JavaScript (basic minification)
    console.log('⚡ Minifying JavaScript...');
    const jsPath = path.join(buildDir, 'js/main.js');
    if (fs.existsSync(jsPath)) {
        let js = fs.readFileSync(jsPath, 'utf8');
        js = js.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove block comments
        js = js.replace(/\/\/.*$/gm, ''); // Remove line comments
        js = js.replace(/\s+/g, ' '); // Compress whitespace
        fs.writeFileSync(jsPath, js);
    }
    
    // Generate build info
    const buildInfo = {
        timestamp: new Date().toISOString(),
        version: require('../package.json').version,
        files: getFileList(buildDir)
    };
    
    fs.writeFileSync(
        path.join(buildDir, 'build-info.json'),
        JSON.stringify(buildInfo, null, 2)
    );
    
    console.log('✅ Build complete!');
    console.log(`📦 Files generated in: ${buildDir}`);
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}

function copyRecursiveSync(src, dest) {
    const stats = fs.lstatSync(src);
    
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        
        fs.readdirSync(src).forEach(childItem => {
            copyRecursiveSync(
                path.join(src, childItem),
                path.join(dest, childItem)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);
        
        if (stat.isDirectory()) {
            getFileList(filePath, fileList);
        } else {
            fileList.push(path.relative(dir, filePath));
        }
    });
    
    return fileList;
}
