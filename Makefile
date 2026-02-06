.PHONY: workon clear unpack pack
PACK_DIRS := ./packs

workon:
	@yarn run fvtt package workon knight-compendium --type Module

clear:
	@yarn run fvtt package clear

unpack:
	@make -s workon
	@echo "Unpack compendiums..."
	@for dir in $(shell ls ${PACK_DIRS}); do \
	    yarn run fvtt package unpack --out _packs_sources/$$dir $$dir >/dev/null; \
	done
	@make -s clear

pack:
	@make -s workon
	@echo "Pack compendiums..."
	@for dir in $(shell ls ${PACK_DIRS}); do \
	    yarn run fvtt package pack --in _packs_sources/$$dir $$dir >/dev/null; \
	done
	@make -s clear
