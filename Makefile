# 需要先安装envoy
deploy: 
	git checkout develop
	rm -rf public/src/dist; cd public/src; gulp app; gulp css; gulp cp
	cd ../..
	git add public/src/dist
	git commit -m 'deploy dist'
	git push origin develop
	cd tools/envoy; ~/.composer/vendor/bin/envoy run web-deploy; cd ../..
package: 
	cd tools/envoy; ~/.composer/vendor/bin/envoy run android-package; cd ../..
release:
	cd tools/envoy; ~/.composer/vendor/bin/envoy run android-release; cd ../..
publish: 
	rm -rf public/src/dist; cd public/src; gulp css; gulp release; gulp cp
	cd ../..
	git add public/src/dist
	git commit -m 'publish dist'
	git push origin master
	git push destination master
	cd tools/envoy; ~/.composer/vendor/bin/envoy run web-publish; cd ../..
#setup:
	#alias proxychains4='proxychains4 -f ~/.proxychans/proxychains.conf'
	#export PATH=/opt/local/bin:$PATH
run:
	sh tools/supervisor/supervisor.sh start
build:
	rm -rf public/src/dist; cd public/src; gulp app; gulp css; gulp release; gulp cp
watch:
	rm -rf public/res; rm -rf public/css; cd public/src; gulp app; gulp less; gulp watch
