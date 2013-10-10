<?php namespace Pongo\Cms\Controllers;

use Pongo\Cms\Support\Repositories\PageRepositoryInterface as Page;
use Pongo\Cms\Support\Repositories\RoleRepositoryInterface as Role;

use Pongo, Theme, Tool, Render, View;

class PageController extends BaseController {

	public function __construct(Page $page, Role $role)
	{
		parent::__construct();

		$this->beforeFilter('pongo.auth');

		$this->page = $page;
		$this->role = $role;
	}

	public function deletedPage()
	{
		return Render::view('sections.page.deleted');
	}

	public function layoutPage($pid)
	{
		Pongo::viewShare('pid', $pid);

		$page = $this->page->getPage($pid);

		$n_elements = $this->page->countPageElements($page);

		$view = Render::view('sections.page.layout');
		$view['section']	= 'layout';
		$view['pid'] 		= $pid;
		$view['name'] 		= $page->name;
		$view['templates']	= Theme::config('template');
		$view['headers']	= Theme::config('header');
		$view['layouts']	= Theme::config('layout');
		$view['footers']	= Theme::config('footer');

		$view['n_elements'] = $n_elements;
		$view['page_link'] 	= '';

		$view['template_selected'] 	= !empty($page->template) ? $page->template : 'default';
		$view['header_selected'] 	= !empty($page->header) ? $page->header : 'default';
		$view['layout_selected'] 	= !empty($page->layout) ? $page->layout : 'default';
		$view['footer_selected'] 	= !empty($page->footer) ? $page->footer : 'default';

		return $view;
	}

	public function linkPage()
	{
		
	}

	public function filesPage($pid)
	{
		Pongo::viewShare('pid', $pid);

		$page = $this->page->getPage($pid);

		$n_files = $this->page->countPageFiles($page);

		$view = Render::view('sections.page.files');
		$view['section']	= 'files';
		$view['pid'] 		= $pid;
		$view['name'] 		= $page->name;

		$view['n_files'] = $n_files;

		return $view;
	}

	public function seoPage($pid)
	{
		Pongo::viewShare('pid', $pid);

		$page = $this->page->getPage($pid);

		$n_elements = $this->page->countPageElements($page);

		$view = Render::view('sections.page.seo');
		$view['section']	= 'seo';
		$view['pid'] 		= $pid;
		$view['name'] 		= $page->name;
		$view['title']		= $page->title;
		$view['keyw']		= $page->keyw;
		$view['descr']		= $page->descr;

		$view['n_elements'] = $n_elements;

		return $view;
	}

	/**
	 * Show page edit settings
	 * 
	 * @param  int $id
	 * @return string     view page
	 */
	public function settingsPage($pid)
	{
		Pongo::viewShare('pid', $pid);

		$page = $this->page->getPage($pid);

		// Available roles
		$roles = $this->role->orderBy('level', 'asc');

		// Role admin array
		$admin_roles = Pongo::adminRoles($roles);

		// Count element per page
		$n_elements = $this->page->countPageElements($page);

		$view = Render::view('sections.page.settings');
		$view['section']	= 'settings';
		$view['pid'] 		= $pid;
		$view['name'] 		= $page->name;
		$view['slug_last'] 	= Tool::slugSlice($page->slug, 1);
		$view['slug_base'] 	= Tool::slugBack($page->slug, 1);
		$view['slug'] 		= $page->slug;
		$view['is_home'] 	= $page->is_home;
		$view['is_valid'] 	= $page->is_valid;
		
		$view['access_level'] 	= $page->access_level;
		$view['role_level'] 	= $page->role_level;
		$view['wrapper_id']		= $page->wrapper_id;
		
		$view['roles']			= $roles;
		$view['admin_roles'] 	= $admin_roles;
		$view['wrappers']		= Pongo::system('wrappers');
		
		$view['n_elements'] 	= $n_elements;

		return $view;
	}

}